import { component$, useContext, useSignal, useStore } from "@builder.io/qwik";
import { MyContext } from "~/routes/layout";

export default component$(() => {
  const state = useStore({
    affirmation: "",
  });
  const author = useSignal("");

  const data = useContext(MyContext);

  return (
    <div class="fixed left-0 top-0 h-screen w-screen bg-gray-900">
      <p>Add an Affirmation</p>
      <input
        type="text"
        placeholder="Enter affirmation"
        onInput$={(e) => {
          state.affirmation = e.target.value;
        }}
      />
      <input type="text" bind:value={author} placeholder="Author" />
      <button
        onClick$={() => {
          if (!author.value && !state.affirmation) {
            return;
          }
          data.affirmations = [
            ...data.affirmations,
            [state.affirmation, author.value],
          ];

          data.openModal = false;
        }}
      >
        Save
      </button>
      <hr />
      <div class="flex flex-col gap-1">
        {data.affirmations.map((data, index) => {
          return <div key={index}>{data[0]}</div>;
        })}
      </div>
    </div>
  );
});
