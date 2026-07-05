import handlebars from "handlebars";
import nodemailer from "nodemailer";
import { logger } from "~~/lib/pino";

interface MailConfig {
  mailer?: string;
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  encryption?: string;
  fromAddress?: string;
  fromName?: string;
}

export interface MailAttachment {
  filename: string;
  content?: string | Buffer | import("node:stream").Readable;
  path?: string;
  contentType?: string;
  cid?: string;
}

export interface MailMessage {
  to?: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  from?: string | { name: string; address: string };
  replyTo?: string;
  subject?: string;
  text?: string;
  html?: string;
  attachments?: MailAttachment[];
  template?: string;
  context?: Record<string, unknown>;
}

let transporter: nodemailer.Transporter | null = null;

/**
 * Resolves and returns the NodeMailer transporter instance.
 * If MAIL_MAILER is 'log' or SMTP credentials are not set, returns null (indicates logging fallback).
 */
export function getTransporter(): nodemailer.Transporter | null {
  const config = useRuntimeConfig();
  const mailConfig = (config.mail as MailConfig) || {};
  const mailer = mailConfig.mailer || "smtp";
  const host = mailConfig.host;

  if (mailer === "log" || !host) {
    return null;
  }

  const isNullOrEmpty = (val: unknown) =>
    !val || val === "null" || val === "undefined";

  if (!transporter) {
    const authUser = mailConfig.username;
    const authPass = mailConfig.password;

    transporter = nodemailer.createTransport({
      host: host,
      port: Number(mailConfig.port || 587),
      secure:
        mailConfig.encryption === "ssl" ||
        mailConfig.encryption === "tls" ||
        Number(mailConfig.port) === 465,
      auth: isNullOrEmpty(authUser)
        ? undefined
        : {
            user: String(authUser),
            pass: isNullOrEmpty(authPass) ? "" : String(authPass),
          },
    });
  }

  return transporter;
}

/**
 * Escapes regex special characters.
 */
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Compiles and renders the email template.
 * First reads the template from Nitro storage, applies square bracket placeholder replacements, and then compiles via Handlebars.
 */
export async function renderTemplate(
  templateName: string,
  context: Record<string, unknown>,
): Promise<string> {
  const fileName = templateName.endsWith(".html")
    ? templateName
    : `${templateName}.html`;

  const storage = useStorage("assets:templates");
  let htmlContent: string | null = null;

  // Try bases first, fallback to root
  const baseKey = `bases/${fileName}`;
  if (await storage.hasItem(baseKey)) {
    htmlContent = (await storage.getItem(baseKey)) as string;
  } else if (await storage.hasItem(fileName)) {
    htmlContent = (await storage.getItem(fileName)) as string;
  }

  if (htmlContent === null) {
    throw new Error(`Email template not found: ${templateName}`);
  }

  // Replace [Bracketed Placeholders] dynamically from context key-values
  for (const [key, value] of Object.entries(context)) {
    // 1. Exact match, e.g., key: "Nama Pengguna" -> replace "[Nama Pengguna]"
    const exactPlaceholder = `[${key}]`;
    htmlContent = htmlContent.replace(
      new RegExp(escapeRegExp(exactPlaceholder), "g"),
      String(value),
    );

    // 2. Snake/Kebab to Title case match, e.g., key: "nama_pengguna" -> "Nama Pengguna" -> replace "[Nama Pengguna]"
    const formattedKey = key
      .split(/[_-]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    const formattedPlaceholder = `[${formattedKey}]`;
    htmlContent = htmlContent.replace(
      new RegExp(escapeRegExp(formattedPlaceholder), "g"),
      String(value),
    );
  }

  // Compile Handlebars variables (e.g. {{ variableName }})
  const compiled = handlebars.compile(htmlContent);
  return compiled(context);
}

/**
 * Low-level utility function to send an email using the resolved transporter.
 */
export async function sendMail(merged: MailMessage): Promise<unknown> {
  // Compile template if set
  if (merged.template) {
    merged.html = await renderTemplate(merged.template, merged.context || {});
  }

  const config = useRuntimeConfig();
  const mailConfig = (config.mail as MailConfig) || {};

  const fromAddress = mailConfig.fromAddress || "no-reply@example.com";
  const fromName = mailConfig.fromName || "Mail";
  const defaultFrom = `"${fromName}" <${fromAddress}>`;

  let fromVal = merged.from || defaultFrom;
  if (typeof fromVal === "object") {
    fromVal = `"${fromVal.name}" <${fromVal.address}>`;
  }

  const mailOptions: nodemailer.SendMailOptions = {
    from: fromVal,
    to: merged.to,
    cc: merged.cc,
    bcc: merged.bcc,
    subject: merged.subject,
    text: merged.text,
    html: merged.html,
    replyTo: merged.replyTo,
    attachments: merged.attachments,
  };

  const client = getTransporter();

  if (!client) {
    // Log driver active
    logger.info(
      {
        mail: {
          from: mailOptions.from,
          to: mailOptions.to,
          cc: mailOptions.cc,
          bcc: mailOptions.bcc,
          subject: mailOptions.subject,
          text: mailOptions.text,
          html: mailOptions.html ? "[HTML Content]" : undefined,
        },
      },
      "Mail simulated/logged (log driver active or MAIL_HOST missing)",
    );
    return {
      messageId: `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      response: "Logged successfully",
    };
  }

  try {
    const info = await client.sendMail(mailOptions);
    logger.info(
      { messageId: info.messageId },
      "Mail sent successfully via SMTP",
    );
    return info;
  } catch (error) {
    logger.error({ err: error }, "Failed to send mail via SMTP");
    throw error;
  }
}
