import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const displayIndex = useSignal(0);

  return (
    <div>
    
  </div>
  );
});

export const head: DocumentHead = {
  title: "Affirmation",
  meta: [
    {
      name: "description",
      content: "Affirmation site description",
    },
  ],
};
