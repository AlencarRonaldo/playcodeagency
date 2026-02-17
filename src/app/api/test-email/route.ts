import { NextRequest, NextResponse } from 'next/server'
import { EmailService } from '@/lib/services/email'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    console.log('🧪 Iniciando teste de email...')

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({
        success: false,
        message: '❌ RESEND_API_KEY não configurada'
      }, { status: 500 })
    }

    const emailService = new EmailService()

    await emailService.sendWelcomeEmail({
      to: 'ronaldoalencar2009@hotmail.com',
      customerName: 'Ronaldo Alencar',
      serviceType: 'website',
      planType: 'starter',
      onboardingUrl: 'https://playcodeagency.xyz/onboarding/test123'
    })

    console.log('✅ Email de teste enviado!')

    return NextResponse.json({
      success: true,
      message: '✅ Email enviado com sucesso via Resend!'
    })

  } catch (error) {
    console.error('❌ Erro no teste de email:', error)

    return NextResponse.json({
      success: false,
      message: '❌ Erro ao enviar email',
      error: String(error)
    }, { status: 500 })
  }
}
