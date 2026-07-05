import { logger } from "~~/lib/pino";
import { Mail } from "~~/server/lib/facades/mail";

export default defineEventHandler(async (event) => {
  try {
    let name = "Guest";
    let email = "guest@example.com";
    let purpose = "general";
    let message = "";

    const contentType = getHeader(event, "content-type") || "";
    if (contentType.includes("multipart/form-data")) {
      const formData = await readFormData(event);
      name = (formData.get("name") ||
        formData.get("fullName") ||
        "Guest") as string;
      email = (formData.get("email") ||
        formData.get("contactEmail") ||
        "guest@example.com") as string;
      purpose = (formData.get("purpose") || "general") as string;
      message = (formData.get("message") ||
        formData.get("messageText") ||
        "") as string;
    } else {
      const body = await readBody(event);
      if (body) {
        name = body.name || body.fullName || "Guest";
        email = body.email || body.contactEmail || "guest@example.com";
        purpose = body.purpose || "general";
        message = body.message || body.messageText || "";
      }
    }

    const purposes: Record<string, string> = {
      "project-collabs": "Kolaborasi Proyek",
      connecting: "Kerjasama",
      services: "Layanan",
      general: "Ingin Bertanya Hal Umum",
      others: "Lainnya",
    };

    const resolvedPurpose = purposes[purpose] || "Tidak diketahui";

    // Use Laravel-style chainable Mail Facade to send email
    await Mail.to(["cakadi190@gmail.com", "catatancakadi@gmail.com"])
      .subject("Ada Pesan Baru Nih")
      .template("email-info", {
        nama_perusahaan_anda: "Cak Adi CV Portofolio",
        nama_pengguna: name,
        nomor_notifikasi: `#MSG-${Date.now().toString().slice(-6)}`,
        tanggal: new Date().toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        kategori_informasi: resolvedPurpose,
        pesan: message,
        email_pengirim: email,
      })
      .send();

    return {
      message: "Success!",
      code: 200,
    };
  } catch (error) {
    logger.error({ err: error }, "Terjadi kesalahan saat mengirim email");
    return {
      code: 500,
      message: "Internal Server Error",
    };
  }
});
