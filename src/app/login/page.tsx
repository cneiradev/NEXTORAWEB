import Link from "next/link";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold mx-auto mb-4">
          N
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Iniciar sesión
        </h2>
        <p className="text-muted-foreground mb-6">
          Accede a tu cuenta de NEXORA TECH.
        </p>
        <Link
          href="/contacto"
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          Solicitar acceso
        </Link>
      </div>
    </div>
  );
}