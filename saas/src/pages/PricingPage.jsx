import React from 'react'

const plans = [
  { name: 'Starter', price: '₹0', tag: 'For early teams', cta: { label: 'Get started for free', href: '/signup' }, features: [
    'Compliance health check','DPDP templates','Email alerts','Up to 3 users'
  ]},
  { name: 'Growth', price: '₹6,999/mo', tag: 'Most popular', cta: { label: 'Get started', href: '/signup?plan=growth' }, features: [
    'Automated filings calendar','Consent ledger','DPIA builder','Slack/MS Teams bots','Unlimited requests'
  ]},
  { name: 'Enterprise', price: 'Custom', tag: 'High-risk/SDF', cta: { label: 'Contact Sales', href: '/contact' }, features: [
    'Dedicated DPO workspace','Audit trails','Custom controls mapping','SSO & roles','On-prem/air-gapped'
  ]}
]

export default function PricingPage(){
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-white">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-semibold">Simple pricing for real progress</h1>
        <p className="text-white/80">Start free. Scale as your risk surface grows.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {plans.map((p, i) => (
          <div key={p.name} className={`glass p-5 relative overflow-hidden ${i===1 ? 'ring-1 ring-accent/40' : ''}`}>
            {i===1 && <div className="absolute -inset-16 bg-[conic-gradient(from_120deg,rgba(47,230,200,.12),rgba(99,102,241,.12),rgba(255,200,97,.12))] blur-2xl" aria-hidden></div>}
            <div className="relative">
              <div className="flex items-center justify-between mb-2"><span className="font-semibold">{p.name}</span><span className="text-xs text-accent/80">{p.tag}</span></div>
              <div className="text-3xl font-semibold mb-4">{p.price}</div>
              <ul className="space-y-2 text-white/90">
                {p.features.map(f => <li key={f} className="flex items-start gap-2"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-accent inline-block"></span>{f}</li>)}
              </ul>
              <a href={p.cta.href} className={`w-full mt-6 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium ${i===1 ? 'bg-accent text-black' : 'border border-white/20 text-white hover:bg-white/10'}`}>
                {p.cta.label}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-center mb-4">Compare plans</h2>
        <div className="glass overflow-hidden">
          <div className="grid grid-cols-4 text-sm">
            <div className="p-3 font-medium bg-white/5">Feature</div>
            <div className="p-3 font-medium text-center bg-white/5">Starter</div>
            <div className="p-3 font-medium text-center bg-white/5">Growth</div>
            <div className="p-3 font-medium text-center bg-white/5">Enterprise</div>
            {[
              ['Compliance health check', '✓', '✓', '✓'],
              ['DPDP templates', '✓', '✓', '✓'],
              ['Automated filings calendar', '—', '✓', '✓'],
              ['Consent ledger', '—', '✓', '✓'],
              ['DPIA builder', '—', '✓', '✓'],
              ['Slack / MS Teams bots', '—', '✓', '✓'],
              ['Users', 'Up to 3', 'Up to 50', 'Unlimited'],
              ['SSO & granular roles', '—', '—', '✓'],
              ['Dedicated DPO workspace', '—', '—', '✓'],
              ['Custom controls mapping', '—', '—', '✓'],
              ['Audit trails', '—', '—', '✓'],
              ['On-prem / air-gapped', '—', '—', '✓']
            ].map((row, idx) => (
              <React.Fragment key={row[0]}>
                <div className={`p-3 ${idx%2? 'bg-white/0' : 'bg-white/5'}`}>{row[0]}</div>
                <div className={`p-3 text-center ${idx%2? 'bg-white/0' : 'bg-white/5'}`}>{row[1]}</div>
                <div className={`p-3 text-center ${idx%2? 'bg-white/0' : 'bg-white/5'}`}>{row[2]}</div>
                <div className={`p-3 text-center ${idx%2? 'bg-white/0' : 'bg-white/5'}`}>{row[3]}</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Need more details */}
      <div className="mt-12 glass p-6">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-xl font-semibold mb-1">Need more details?</h3>
            <p className="text-white/80">Have high-risk workflows, SDF/SRO needs, or procurement requirements? Talk to us and we’ll tailor a rollout.</p>
          </div>
          <div className="flex gap-3 md:justify-end">
            <a href="/contact" className="px-4 py-2 rounded-md bg-accent text-black text-sm font-medium">Contact Sales</a>
            <a href="/signup" className="px-4 py-2 rounded-md border border-white/20 text-white text-sm hover:bg-white/10">Get started</a>
          </div>
        </div>
      </div>
    </div>
  )
}
