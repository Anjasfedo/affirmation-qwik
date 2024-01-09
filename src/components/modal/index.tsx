import { component$, useContext, useSignal, useStore } from "@builder.io/qwik";
import { MyContext } from "~/routes/layout";

export default component$(() => {
  const state = useStore({
    affirmation: "",
  });
  const author = useSignal("");

  const data = useContext(MyContext);

  return (
    <div class="fixed left-0 top-0 flex h-screen w-screen flex-col gap-2 bg-gray-900 p-4">
      <p class="text-center text-2xl font-semibold">Add an Affirmation</p>
      <input
        type="text"
        placeholder="Enter affirmation"
        onInput$={(e) => {
          state.affirmation = e.target.value;
        }}
        class="bg=transparent bordeer-sky-800 rounded border text-sm outline-none duration-200 focus:border-sky-400 focus:outline-none sm:text-base"
      />
      <input
        type="text"
        bind:value={author}
        placeholder="Author"
        class="bg=transparent bordeer-sky-800 rounded border text-sm outline-none duration-200 focus:border-sky-400 focus:outline-none sm:text-base"
      />
      <button
        onClick$={() => {
          if (!author.value && !state.affirmation) {
            return;
          }
          data.affirmations = [
            ...data.affirmations,
            [state.affirmation, author.value],
          ];

          localStorage.setItem(
            "affirmation-qwik",
            JSON.stringify({ affirmations: data.affirmations }),
          );

          data.openModal = false;
        }}
        class="ml-auto rounded bg-sky-400 px-4 py-2 text-sm duration-200 hover:bg-sky-600"
      >
        Save
      </button>
      <div class="h-[1px] bg-sky-300 opacity-50"></div>
      <div class="flex flex-col gap-1 overflow-scroll">
        {data.affirmations.map((item, index) => {
          return (
            <div
              key={index}
              class="flex items-center gap-2 rounded bg-gray-700 p-2 text-sm"
            >
              <div class="flex flex-1 flex-col">
                <p>{item[0]}</p>
                <p class="text-xs text-gray-300">
                  <i>{item[1]}</i>
                </p>
              </div>
              <i
                onClick$={() => {
                  data.affirmations = data.affirmations.filter(
                    (element, elementIndex) => {
                      return elementIndex !== index;
                    },
                  );
                }}
                class="fa-solid fa-minus cursor-pointer duration-200 hover:scale-125"
              ></i>
            </div>
          );
        })}
      </div>
    </div>
  );
});
