import { ContactForm } from "@/components/ContactForm"

export default function Contacto() {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="py-20 px-6">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">¿Quieres ser cliente?</h1>
            <p className="text-muted-foreground">Déjanos tus datos y acordamos tu plan mensual directamente.</p>
          </div>
          <div className="bg-card p-8 rounded-2xl card border border-border shadow-sm">
            <ContactForm mode="cotizar" />
          </div>
        </div>
      </section>
    </div>
  )
}
