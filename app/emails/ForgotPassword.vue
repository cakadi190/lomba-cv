<template>
  <EHtml>
    <EHead>
      <EFont font-family="Signika" fallback-font-family="Arial" :web-font="{
        url: 'https://static.cakadi.eu.org/fonts/signika/static/Signika-Bold.ttf',
        format: 'woff2'
      }" :font-weight="700" font-style="normal" />
      <EFont font-family="Signika" fallback-font-family="Arial" :web-font="{
        url: 'https://static.cakadi.eu.org/fonts/signika/static/Signika-Regular.ttf',
        format: 'woff2'
      }" :font-weight="400" font-style="normal" />
      <EStyle>
        body, table, td, a, strong, b, p, span, div, h1, h2, h3, a[href] {
          font-family: 'Signika', Arial, Helvetica, sans-serif !important;
        }
        @media only screen and (max-width: 600px) {
          .email-container { width: 100% !important; }
          .fluid-padding { padding-left: 20px !important; padding-right: 20px !important; }
          .btn-full { width: 100% !important; }
        }
      </EStyle>
    </EHead>
    <EBody style="margin: 0; padding: 0; background-color: #ffffff;">
      <EPreview>Permintaan atur ulang kata sandi akun Catatan Mas Adi Anda.</EPreview>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff;">
        <tr>
          <td align="center" style="padding: 24px 12px;">
            <table role="presentation" class="email-container" width="600" cellpadding="0" cellspacing="0" border="0" style="width: 600px; max-width: 600px; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px;">
              <!-- Accent bar -->
              <tr>
                <td style="background-color: #ef4444; height: 6px; line-height: 6px; font-size: 1px; border-radius: 8px 8px 0 0;">&nbsp;</td>
              </tr>

              <!-- Header / Brand -->
              <tr>
                <td class="fluid-padding" style="padding: 28px 40px 0 40px;" align="left">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="font-size: 18px; font-weight: bold; color: #2563eb;">
                        <a href="https://v3.masadi.net/">
                          <img alt="Logo Mas Adi" src="https://v3.masadi.net/images/brands/logo-color.svg" style="width: auto; height: 48px; display: block; border: 0;" />
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Status badge -->
              <tr>
                <td class="fluid-padding" style="padding: 24px 40px 0 40px;" align="left">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="background-color: #fef2f2; border: 1px solid #fca5a5; border-radius: 20px; padding: 6px 16px; font-size: 12px; font-weight: bold; color: #ef4444; letter-spacing: 0.5px; text-transform: uppercase;">
                        Atur Ulang Kata Sandi
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Heading -->
              <tr>
                <td class="fluid-padding" style="padding: 16px 40px 0 40px;" align="left">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="font-size: 22px; font-weight: bold; color: #111827; line-height: 1.3;">
                        Permintaan Atur Ulang Kata Sandi
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Body text -->
              <tr>
                <td class="fluid-padding" style="padding: 12px 40px 0 40px;" align="left">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="font-size: 14px; color: #4b5563; line-height: 1.6;">
                        Halo <strong>{{ namaPengguna }}</strong>,<br><br>
                        Kami menerima permintaan untuk mengatur ulang kata sandi akun Catatan Mas Adi Anda. Silakan klik tombol di bawah ini untuk melanjutkan proses atur ulang kata sandi Anda.
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- CTA Button -->
              <tr>
                <td class="fluid-padding" style="padding: 28px 40px 0 40px;" align="left">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="border-radius: 6px; background-color: #ef4444;" class="btn-full">
                        <a :href="resetUrl" target="_blank" style="display: inline-block; padding: 13px 28px; font-size: 14px; font-weight: bold; color: #ffffff; text-decoration: none; border-radius: 6px;">
                          Atur Ulang Kata Sandi
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Closing text -->
              <tr>
                <td class="fluid-padding" style="padding: 28px 40px 0 40px;" align="left">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="font-size: 13px; color: #6b7280; line-height: 1.6;">
                        Tautan ini hanya berlaku selama <strong>1 jam</strong>. Jika Anda tidak merasa melakukan permintaan ini, harap abaikan email ini dan kata sandi Anda tidak akan berubah.
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Divider -->
              <tr>
                <td style="padding: 28px 40px 0 40px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="border-top: 1px solid #e5e7eb; font-size: 1px; line-height: 1px;">&nbsp;</td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td class="fluid-padding" style="padding: 20px 40px 28px 40px;" align="left">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="font-size: 12px; color: #9ca3af; line-height: 1.6;">
                        &copy; 2024 Catatan Mas Adi. Seluruh hak cipta dilindungi.<br>
                        Jika Anda butuh bantuan, hubungi tim dukungan kami.
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </EBody>
  </EHtml>
</template>

<script setup lang="ts">
interface Props {
  namaPengguna?: string;
  resetUrl?: string;
}

defineProps<Props>();
</script>
