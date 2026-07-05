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
      <EPreview>Ada hal yang perlu Anda perhatikan segera terkait akun Anda.</EPreview>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff;">
        <tr>
          <td align="center" style="padding: 24px 12px;">
            <table role="presentation" class="email-container" width="600" cellpadding="0" cellspacing="0" border="0" style="width: 600px; max-width: 600px; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px;">
              <!-- Accent bar -->
              <tr>
                <td style="background-color: #fbbf24; height: 6px; line-height: 6px; font-size: 1px; border-radius: 8px 8px 0 0;">&nbsp;</td>
              </tr>

              <!-- Header / Brand -->
              <tr>
                <td class="fluid-padding" style="padding: 28px 40px 0 40px;" align="left">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="font-size: 18px; font-weight: bold; color: #2563eb;">
                        {{ namaPerusahaanAnda || 'Nama Perusahaan Anda' }}
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
                      <td style="background-color: #fffbeb; border: 1px solid #fbbf24; border-radius: 20px; padding: 6px 16px; font-size: 12px; font-weight: bold; color: #b45309; letter-spacing: 0.5px; text-transform: uppercase;">
                        &#9888; Peringatan
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
                        Mohon Perhatikan Hal Berikut
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
                        Halo <strong>{{ namaPengguna || 'Pengguna' }}</strong>,<br><br>
                        {{ pesan || 'Kami ingin mengingatkan Anda mengenai hal berikut yang memerlukan perhatian atau tindakan Anda.' }}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Detail table -->
              <tr>
                <td class="fluid-padding" style="padding: 20px 40px 0 40px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border: 1px solid #e5e7eb; border-radius: 6px;">
                    <tr>
                      <td style="padding: 14px 18px; font-size: 13px; color: #6b7280; border-bottom: 1px solid #e5e7eb;" width="45%">
                        Nomor Peringatan
                      </td>
                      <td style="padding: 14px 18px; font-size: 13px; color: #111827; font-weight: bold; border-bottom: 1px solid #e5e7eb;" align="right">
                        {{ nomorNotifikasi || nomorPeringatan || '#WARN-000123' }}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 14px 18px; font-size: 13px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">
                        Tanggal
                      </td>
                      <td style="padding: 14px 18px; font-size: 13px; color: #111827; font-weight: bold; border-bottom: 1px solid #e5e7eb;" align="right">
                        {{ tanggal || '05 Juli 2026' }}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 14px 18px; font-size: 13px; color: #6b7280;">
                        Tingkat Urgensi
                      </td>
                      <td style="padding: 14px 18px; font-size: 14px; color: #b45309; font-weight: bold;" align="right">
                        {{ tingkatUrgensi || kategoriInformasi || 'Tinggi' }}
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
                      <td style="border-radius: 6px; background-color: #2563eb;" class="btn-full">
                        <a :href="ctaUrl || '#'" target="_blank" style="display: inline-block; padding: 13px 28px; font-size: 14px; font-weight: bold; color: #ffffff; text-decoration: none; border-radius: 6px;">
                          {{ tombolCta || 'Tindak Lanjuti Sekarang' }}
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
                        Segera lakukan tindakan yang diperlukan untuk menghindari dampak lebih lanjut.
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
                        &copy; 2026 {{ namaPerusahaanAnda || 'Nama Perusahaan Anda' }}. Seluruh hak cipta dilindungi.<br>
                        Alamat Perusahaan, Kota, Kode Pos<br>
                        <a href="https://v3.masadi.net/" style="color: #16a34a; text-decoration: none;">Berhenti Berlangganan</a> &nbsp;|&nbsp;
                        <a href="https://v3.masadi.net/" style="color: #16a34a; text-decoration: none;">Pusat Bantuan</a>
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
  namaPerusahaanAnda?: string;
  namaPengguna?: string;
  nomorNotifikasi?: string;
  nomorPeringatan?: string;
  tanggal?: string;
  tingkatUrgensi?: string;
  kategoriInformasi?: string;
  ctaUrl?: string;
  tombolCta?: string;
  pesan?: string;
}

defineProps<Props>();
</script>
