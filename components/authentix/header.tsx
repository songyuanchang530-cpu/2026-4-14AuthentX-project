interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="px-8 pt-8 pb-0">
      <h1 className="bg-gradient-to-br from-[#c0c1ff] to-[#4b4dd8] bg-clip-text text-2xl font-medium tracking-tight text-transparent mb-6">
        {title}
      </h1>
    </header>
  )
}
