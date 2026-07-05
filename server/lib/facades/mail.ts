import {
  type MailAttachment,
  type MailMessage,
  sendMail,
} from "~~/server/lib/utils/mail";

/**
 * Chainable builder class for constructing and sending email messages.
 */
export class MailMessageBuilder {
  private options: MailMessage = {};

  /**
   * Set recipient email(s).
   */
  to(to: string | string[]): this {
    this.options.to = to;
    return this;
  }

  /**
   * Set CC recipient email(s).
   */
  cc(cc: string | string[]): this {
    this.options.cc = cc;
    return this;
  }

  /**
   * Set BCC recipient email(s).
   */
  bcc(bcc: string | string[]): this {
    this.options.bcc = bcc;
    return this;
  }

  /**
   * Set custom sender address.
   */
  from(from: string | { name: string; address: string }): this {
    this.options.from = from;
    return this;
  }

  /**
   * Set reply-to address.
   */
  replyTo(replyTo: string): this {
    this.options.replyTo = replyTo;
    return this;
  }

  /**
   * Set email subject.
   */
  subject(subject: string): this {
    this.options.subject = subject;
    return this;
  }

  /**
   * Set plain text body content.
   */
  text(text: string): this {
    this.options.text = text;
    return this;
  }

  /**
   * Set HTML body content.
   */
  html(html: string): this {
    this.options.html = html;
    return this;
  }

  /**
   * Attach files to the email.
   */
  attachments(attachments: MailAttachment[]): this {
    this.options.attachments = attachments;
    return this;
  }

  /**
   * Select a template and optionally bind a context to it.
   */
  template(templateName: string, context?: Record<string, unknown>): this {
    this.options.template = templateName;
    if (context) {
      this.options.context = context;
    }
    return this;
  }

  /**
   * Bind additional variables or context for the template.
   */
  context(context: Record<string, unknown>): this {
    this.options.context = { ...(this.options.context || {}), ...context };
    return this;
  }

  /**
   * Execute the send command.
   * Merges builder options with any final manual options provided.
   */
  async send(customOptions?: Partial<MailMessage>): Promise<unknown> {
    const merged = { ...this.options, ...customOptions };
    return sendMail(merged);
  }
}

/**
 * Laravel-style Mail Facade.
 */
export const Mail = {
  /**
   * Set recipient for the email message.
   */
  to(to: string | string[]): MailMessageBuilder {
    return new MailMessageBuilder().to(to);
  },

  /**
   * Set CC for the email message.
   */
  cc(cc: string | string[]): MailMessageBuilder {
    return new MailMessageBuilder().cc(cc);
  },

  /**
   * Set BCC for the email message.
   */
  bcc(bcc: string | string[]): MailMessageBuilder {
    return new MailMessageBuilder().bcc(bcc);
  },

  /**
   * Set subject for the email message.
   */
  subject(subject: string): MailMessageBuilder {
    return new MailMessageBuilder().subject(subject);
  },

  /**
   * Send a raw text message.
   */
  raw(text: string, to?: string | string[]): MailMessageBuilder {
    const builder = new MailMessageBuilder().text(text);
    if (to) {
      builder.to(to);
    }
    return builder;
  },

  /**
   * Direct send using direct config options.
   */
  async send(options: MailMessage): Promise<unknown> {
    const builder = new MailMessageBuilder();
    builder.to(options.to || []);
    if (options.cc) builder.cc(options.cc);
    if (options.bcc) builder.bcc(options.bcc);
    if (options.from) builder.from(options.from);
    if (options.replyTo) builder.replyTo(options.replyTo);
    if (options.subject) builder.subject(options.subject);
    if (options.text) builder.text(options.text);
    if (options.html) builder.html(options.html);
    if (options.attachments) builder.attachments(options.attachments);
    if (options.template) builder.template(options.template, options.context);
    return builder.send();
  },
};
