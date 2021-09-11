import { useMutation, useQuery } from "@apollo/client"
import { useCallback } from "react";
import { User } from ".prisma/client";
import PUBLIC_MESSAGES_QUERY from "../graphql/queries/allPublicMessages";
import ME_QUERY from "../graphql/queries/me";
import DELETE_PUBLIC_MESSAGE_MUTATION from "../graphql/mutations/deletePublicMessage";

interface Author {
  id: string;
  name: string;
}

interface PublicMessage {
  id: string
  message: string
  author: Author
}

const PublicMessageList = () => {
  const { data: meData } = useQuery<User>(ME_QUERY);
  const { loading, error, data } = useQuery<{ publicMessages: PublicMessage[] }>(PUBLIC_MESSAGES_QUERY)
  const [deletePublicMessage, { loading: deleting, error: deleteError }] = useMutation<PublicMessage, { id: string }>(DELETE_PUBLIC_MESSAGE_MUTATION, {
    refetchQueries: [
      PUBLIC_MESSAGES_QUERY
    ],
  })

  const deleteHandler = useCallback(
    (id) => (e) => {
      e.preventDefault()
      if (!deleting) {
        deletePublicMessage({ variables: { id } })
      }
    },
    [deleting],
  )

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <>{data?.publicMessages?.map(({ id, message, author }) => (
    <div key={id} className="bg-gray-200 border-gray-400 p-2 flex flex-row">
      <div className="flex-1">
        <span>{message}</span>
        {author && author.name ? <span className="text-gray-700 ml-2 italic">{author.name}</span> : null}
      </div>
      {meData && meData?.me?.id === author.id && <button className="ml-2 bg-white text-gray-700 text-xs uppercase px-2 py-1" type="button" disabled={deleting} onClick={deleteHandler(id)}>delete</button>}
      {/* {deleting && <span>...deleting</span>} */}
    </div>
  ))}</>
}

export default PublicMessageList