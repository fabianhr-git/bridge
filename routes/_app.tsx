import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html class="h-full">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>DZHV Bridge</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body class="h-full bg-dark-zinc950">
        <Component />
      </body>
    </html>
  );
}
