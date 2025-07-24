export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

export const dynamic = 'force-dynamic'
export const revalidate = 0 