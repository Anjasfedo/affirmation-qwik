import {
  component$,
  createContextId,
  Slot,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";
import Modal from "~/components/modal";

export const MyContext = createContextId("affirmation-qwik");

export default component$(() => {
  const state = useStore({
    affirmations: [],
    openModal: false,
  });

  useContextProvider(MyContext, state);

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
      <main class="mx-auto flex w-full max-w-[1200px] flex-1 flex-col">
        <Slot />
      </main>
      <footer></footer>
    </>
  );
});
