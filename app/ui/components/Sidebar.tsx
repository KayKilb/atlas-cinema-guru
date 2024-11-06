import Link from "next/link";

export default function Sidebar() {
  return (
    <aside>
      <nav>
        <Link href="/home">Home</Link>
        <Link href="/favorites">Favorites</Link>
        <Link href="/watch-later">Watch Later</Link>
      </nav>
    </aside>
  );
}
