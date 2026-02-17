import { Resend } from 'resend';

const FROM_EMAIL = process.env.EMAIL_FROM || 'PlayCode Agency <contato@playcodeagency.xyz>';
const TO_EMAIL = process.env.EMAIL_TO || 'contato@playcodeagency.xyz';

function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) {
    console.warn('⚠️ RESEND_API_KEY não configurada.');
    return null;
  }
  return new Resend(process.env.RESEND_API_KEY);
}

interface WelcomeEmailData {
  to: string;
  customerName: string;
  serviceType: 'website' | 'ecommerce' | 'mobile' | 'marketing' | 'automation';
  planType: 'starter' | 'pro' | 'enterprise';
  onboardingUrl: string;
}

interface FollowUpEmailData {
  to: string;
  customerName: string;
  serviceType: string;
  onboardingUrl: string;
  daysElapsed: number;
}

interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  project_type: string;
  budget_range?: string;
  urgency: string;
  message: string;
  lead_score: number;
}

export class EmailService {
  async sendContactFormEmail(data: ContactEmailData): Promise<void> {
    const resend = getResend();
    if (!resend) return;

    const template = this.generateContactFormTemplate(data);

    console.log('📧 Enviando email via Resend...');

    const { data: result, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: data.email,
      subject: `Nova Missão (Lead Score: ${data.lead_score}): ${data.project_type}`,
      html: template,
    });

    if (error) {
      console.error('❌ Resend error:', error);
      throw new Error(`Resend error: ${error.message}`);
    }

    console.log('✅ Email enviado via Resend - ID:', result?.id);
  }

  async sendWelcomeEmail(data: WelcomeEmailData): Promise<void> {
    const resend = getResend();
    if (!resend) return;

    const serviceNames = {
      website: 'Website/Landing Page',
      ecommerce: 'E-commerce',
      mobile: 'Aplicativo Mobile',
      marketing: 'Marketing Digital',
      automation: 'Automação de Processos'
    };

    const planNames = {
      starter: 'Starter Pack',
      pro: 'Pro Guild',
      enterprise: 'Enterprise'
    };

    const template = this.generateWelcomeTemplate({
      customerName: data.customerName,
      serviceName: serviceNames[data.serviceType],
      planName: planNames[data.planType],
      onboardingUrl: data.onboardingUrl
    });

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [data.to],
      subject: `Bem-vindo à PlayCode! Vamos começar seu ${serviceNames[data.serviceType]}`,
      html: template,
    });

    if (error) {
      console.error('❌ Resend error:', error);
      throw new Error(`Resend error: ${error.message}`);
    }
  }

  async sendFollowUpEmail(data: FollowUpEmailData): Promise<void> {
    const resend = getResend();
    if (!resend) return;

    const template = this.generateFollowUpTemplate(data);

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [data.to],
      subject: `Continue seu projeto ${data.serviceType} - PlayCode Agency`,
      html: template,
    });

    if (error) {
      console.error('❌ Resend error:', error);
      throw new Error(`Resend error: ${error.message}`);
    }
  }

  private generateContactFormTemplate(data: ContactEmailData): string {
    const projectTypes: Record<string, string> = {
      'website': 'Website/Landing Page',
      'webapp': 'Web Application',
      'mobile': 'Mobile App',
      'ai': 'AI Integration',
      'ecommerce': 'E-commerce',
      'custom': 'Custom Solution'
    };

    const urgencyLevels: Record<string, string> = {
      'low': 'Standard (30-60 dias)',
      'normal': 'Fast Track (15-30 dias)',
      'high': 'Rush (7-15 dias)',
      'critical': 'Emergency (< 7 dias)'
    };

    const urgencyColors: Record<string, string> = {
      'low': '#22c55e',
      'normal': '#3b82f6',
      'high': '#f59e0b',
      'critical': '#ef4444'
    };

    return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin:0;padding:20px;font-family:'Segoe UI',Tahoma,sans-serif;background:#f8fafc;color:#1e293b;">
      <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.1);">

        <div style="background:linear-gradient(135deg,#0ea5e9,#8b5cf6);padding:30px 20px;text-align:center;color:#fff;">
          <div style="font-size:28px;font-weight:900;margin-bottom:8px;">PlayCode Agency</div>
          <div style="font-size:22px;font-weight:bold;">Nova Missão Recebida!</div>
          <div style="margin-top:12px;display:inline-block;background:rgba(255,255,255,0.2);padding:6px 16px;border-radius:20px;font-size:14px;">
            Lead Score: <strong>${data.lead_score}</strong>
          </div>
        </div>

        <div style="padding:30px;">
          <h2 style="font-size:18px;color:#0f172a;margin-bottom:16px;border-bottom:2px solid #e2e8f0;padding-bottom:8px;">Informações do Contato</h2>

          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:10px;background:#f9fafb;border-radius:8px;font-weight:600;color:#475569;width:120px;">Nome</td>
              <td style="padding:10px;font-weight:bold;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding:10px;background:#f9fafb;font-weight:600;color:#475569;">Email</td>
              <td style="padding:10px;"><a href="mailto:${data.email}" style="color:#0ea5e9;font-weight:bold;">${data.email}</a></td>
            </tr>
            ${data.phone ? `<tr>
              <td style="padding:10px;background:#f9fafb;font-weight:600;color:#475569;">Telefone</td>
              <td style="padding:10px;font-weight:bold;">${data.phone}</td>
            </tr>` : ''}
            ${data.company ? `<tr>
              <td style="padding:10px;background:#f9fafb;font-weight:600;color:#475569;">Empresa</td>
              <td style="padding:10px;font-weight:bold;">${data.company}</td>
            </tr>` : ''}
          </table>

          <h2 style="font-size:18px;color:#0f172a;margin:24px 0 16px;border-bottom:2px solid #e2e8f0;padding-bottom:8px;">Detalhes da Missão</h2>

          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:10px;background:#f9fafb;font-weight:600;color:#475569;width:120px;">Projeto</td>
              <td style="padding:10px;">
                <span style="background:#059669;color:#fff;padding:4px 12px;border-radius:12px;font-weight:bold;font-size:13px;">
                  ${projectTypes[data.project_type] || data.project_type}
                </span>
              </td>
            </tr>
            ${data.budget_range ? `<tr>
              <td style="padding:10px;background:#f9fafb;font-weight:600;color:#475569;">Orçamento</td>
              <td style="padding:10px;font-weight:bold;">${data.budget_range}</td>
            </tr>` : ''}
            <tr>
              <td style="padding:10px;background:#f9fafb;font-weight:600;color:#475569;">Urgência</td>
              <td style="padding:10px;">
                <span style="background:${urgencyColors[data.urgency] || '#3b82f6'};color:#fff;padding:4px 12px;border-radius:12px;font-weight:bold;font-size:13px;">
                  ${urgencyLevels[data.urgency] || data.urgency}
                </span>
              </td>
            </tr>
          </table>

          <h2 style="font-size:18px;color:#0f172a;margin:24px 0 16px;border-bottom:2px solid #e2e8f0;padding-bottom:8px;">Mensagem</h2>
          <div style="background:#f9fafb;border:1px solid #e2e8f0;border-radius:12px;padding:20px;font-size:15px;line-height:1.7;">
            ${data.message.replace(/\n/g, '<br>')}
          </div>
        </div>

        <div style="background:#f1f5f9;padding:16px;text-align:center;font-size:13px;color:#64748b;">
          PlayCode Agency - Email gerado automaticamente
        </div>
      </div>
    </body>
    </html>`;
  }

  private generateWelcomeTemplate(data: {
    customerName: string;
    serviceName: string;
    planName: string;
    onboardingUrl: string;
  }): string {
    return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head><meta charset="UTF-8"></head>
    <body style="margin:0;padding:20px;font-family:'Segoe UI',sans-serif;background:#0a0a0a;color:#fff;">
      <div style="max-width:600px;margin:0 auto;background:#1a1a2e;border-radius:16px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#00d4ff,#ff00ff);padding:30px;text-align:center;">
          <div style="font-size:28px;font-weight:bold;color:#000;">PlayCode Agency</div>
        </div>
        <div style="padding:40px 30px;">
          <h1 style="color:#00d4ff;margin-bottom:20px;">Olá, ${data.customerName}!</h1>
          <p>Bem-vindo à PlayCode Agency! Seu pagamento foi confirmado.</p>
          <p style="margin:16px 0;"><span style="background:linear-gradient(45deg,#ff6b6b,#4ecdc4);color:#000;padding:8px 16px;border-radius:20px;font-weight:bold;">${data.serviceName} - ${data.planName}</span></p>
          <p>Complete o onboarding para iniciarmos seu projeto:</p>
          <p style="text-align:center;margin:30px 0;">
            <a href="${data.onboardingUrl}" style="background:linear-gradient(45deg,#00d4ff,#ff00ff);color:#000;padding:15px 30px;text-decoration:none;border-radius:30px;font-weight:bold;font-size:18px;">Iniciar Onboarding</a>
          </p>
        </div>
        <div style="background:rgba(0,0,0,0.5);padding:20px;text-align:center;font-size:14px;color:#888;">
          PlayCode Agency - Email automático
        </div>
      </div>
    </body>
    </html>`;
  }

  private generateFollowUpTemplate(data: FollowUpEmailData): string {
    return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head><meta charset="UTF-8"></head>
    <body style="margin:0;padding:20px;font-family:'Segoe UI',sans-serif;background:#0a0a0a;color:#fff;">
      <div style="max-width:600px;margin:0 auto;background:#1a1a2e;border-radius:16px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#00d4ff,#ff00ff);padding:30px;text-align:center;">
          <div style="font-size:28px;font-weight:bold;color:#000;">PlayCode Agency</div>
        </div>
        <div style="padding:40px 30px;">
          <h1 style="color:#00d4ff;">Olá, ${data.customerName}!</h1>
          <p>Seu projeto ${data.serviceType} está esperando! Complete o onboarding:</p>
          <p style="text-align:center;margin:30px 0;">
            <a href="${data.onboardingUrl}" style="background:linear-gradient(45deg,#00d4ff,#ff00ff);color:#000;padding:15px 30px;text-decoration:none;border-radius:30px;font-weight:bold;">Continuar Onboarding</a>
          </p>
        </div>
        <div style="background:rgba(0,0,0,0.5);padding:20px;text-align:center;font-size:14px;color:#888;">
          PlayCode Agency - Email automático
        </div>
      </div>
    </body>
    </html>`;
  }
}
