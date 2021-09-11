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
    <form onSubmit={submit} className="bg-green-300 text-green-700 p-2 flex flex-row">
      <div className="flex-1 flex-column mr-2">
        <label htmlFor="message-input" className="text-green-800 font-semibold block">
          Message
        </label>
        <input id="message-input" className="bg-white text-green-800 border-green-600 px-2 py-1 w-full" disabled={loading} onChange={e => setMessage(e.target.value)} value={message} />
      </div>
      <button className="uppercase py-1 px-2 text-white bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity" disabled={loading || !message.trim().length} type='submit'>
        post
      </button>
    </form>
  );
}

export default CreatePublicMessage