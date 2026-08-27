export default function PageHeader({ title, subtitle }) {
  return (
    <div className="bg-primary text-white py-14 px-6 text-center">
      <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
      {subtitle && <p className="mt-3 max-w-2xl mx-auto text-blue-100">{subtitle}</p>}
    </div>
  )
}
