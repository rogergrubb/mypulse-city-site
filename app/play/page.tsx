import { redirect } from "next/navigation";

export const metadata = {
  title: "Play Pulse",
  description: "The showcase app — multiplayer jetpack combat over real cities.",
};

/**
 * /play redirects to the Jetpack Inferno deploy — the showcase
 * application built on Pulse SDK. Kept as a Next.js server-side
 * redirect so the marketing nav can link to a stable in-domain URL.
 */
export default function PlayRedirect() {
  redirect("https://jetpack-inferno.vercel.app");
}
