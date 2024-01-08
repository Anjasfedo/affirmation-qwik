import { component$, useContext, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { MyContext } from "./layout";

export default component$(() => {
  const displayIndex = useSignal(0);

  const data = useContext(MyContext);

  return (
    <>
      {data.affirmations.length > 0 ? (
        <>
          <h1>{data.affirmations[displayIndex.value][0]}</h1>
          <p>
            <i>{data.affirmations[displayIndex.value][1]}</i>
          </p>
        </>
      ) : (
        <>
          <p>Welcome</p>
          <p onClick$={() => (data.openModal = true)}>Add an Affirmation</p>
        </>
      )}
    </>
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
