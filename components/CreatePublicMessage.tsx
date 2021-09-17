import { useCallback, useState } from "react"
import { useMutation } from "@apollo/client"
import { PublicMessage } from ".prisma/client";
import PUBLIC_MESSAGES_QUERY from "../graphql/queries/allPublicMessages";
import CREATE_PUBLIC_MESSAGE_MUTATION from "../graphql/mutations/createPublicMessage";

const CreatePublicMessage = () => {
  const [message, setMessage] = useState("")
  const [createPublicMessage, { data, loading, error }] = useMutation<PublicMessage, { message: string }>(CREATE_PUBLIC_MESSAGE_MUTATION, {
    refetchQueries: [
      PUBLIC_MESSAGES_QUERY
    ]
  })
  const submit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!loading || !message.trim().length) {
        await createPublicMessage({ variables: { message } })
        setMessage(() => "")
      }
    },
    [message, loading],
  )

  return (
    <form
      onSubmit={submit}
      className="bg-green-200 dark:bg-green-800 text-green-700 dark:text-green-300 flex flex-col rounded-xl p-10"
    >
      <label
        htmlFor="message-input"
        className="mb-4 text-green-800 dark:text-green-200 font-medium block text-lg"
      >
        Your message to the world
      </label>
      <textarea
        id="message-input"
        className="dark:bg-black border-0 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-green-300 focus:ring-green-700 block dark:focus:ring-offset-black focus:ring-offset-white sm:text-sm w-full"
        disabled={loading}
        onChange={e => setMessage(e.target.value)}
        value={message}
      />
      <button
        className="font-bold focus:outline-none focus:ring-2 dark:focus:ring-green-400 focus:ring-green-600 text-lg uppercase py-2 px-2 text-white  bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity rounded-md"
        disabled={loading || !message.trim().length}
        type='submit'
      >
        post
      </button>
    </form>
  );
}

export default CreatePublicMessage