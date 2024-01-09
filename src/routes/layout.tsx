import {
  component$,
  createContextId,
  Slot,
  useContextProvider,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import Modal from "~/components/modal";

export const MyContext = createContextId("affirmation-qwik");

export default component$(() => {
  const state = useStore({
    affirmations: [],
    openModal: true,
  });

  useContextProvider(MyContext, state);

  useVisibleTask$(() => {
    if (localStorage.getItem("affirmation-qwik")) {
      state.affirmations = JSON.parse(
        localStorage.getItem("affirmation-qwik"),
      ).affirmations;
    }
  });

  return (
    <>
      {state.openModal && <Modal />}
      <header>
        <i
          onClick$={() => {
            state.openModal = !state.openModal;
          }}
          class="fa-solid fa-plus cursor-pointer"
        ></i>
      </header>
      <main class="mx-auto flex w-full max-w-[1200px] flex-1 flex-col items-center justify-center gap-2">
        <Slot />
      </main>
      <footer></footer>
    </>
  );
});
