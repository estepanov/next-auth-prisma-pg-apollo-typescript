import { useMutation, useQuery } from "@apollo/client"
import { useCallback } from "react";
import PUBLIC_MESSAGES_QUERY from "graphql/queries/allPublicMessages";
import ME_QUERY from "graphql/queries/me";
import DELETE_PUBLIC_MESSAGE_MUTATION from "graphql/mutations/deletePublicMessage";
import { User } from ".prisma/client";
import dayjs from "dayjs";

import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

interface Author {
  id: string;
  name: string;
}

interface PublicMessage {
  id: string
  message: string
  author: Author
  createdAt: string
}

const PublicMessageList = () => {
  const { data: meData } = useQuery<User>(ME_QUERY);
  const { loading, error, data } = useQuery<{ publicMessages: PublicMessage[] }>(PUBLIC_MESSAGES_QUERY)
  const [deletePublicMessage, { loading: deleting }] = useMutation<PublicMessage, { id: string }>(DELETE_PUBLIC_MESSAGE_MUTATION, {
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

  return <>{data?.publicMessages?.map(({ id, message, author, createdAt }) => {
    const isAuthor = meData && meData?.me?.id === author.id;

    return (
      <div key={id} className="bg-white dark:bg-black p-4 flex flex-row rounded-md mb-4">
        <div className="flex-1">
          <div>
            <div>
              {author ? <span className="text-gray-800 dark:text-gray-200 font-medium text-sm">{author.name || `anonymous`}</span> : null}
              {author && isAuthor ? <span className="ml-2 text-green-700 dark:text-green-300 text-xs font-black">YOU</span> : null}
            </div>
            {author && !author.name ? <span className="block text-gray-400 text-xs">{author.id}</span> : null}
          </div>
          <div className="mt-2">{message}</div>
        </div>
        <div className="ml-2 flex flex-col items-end">
          {createdAt ? <span className="text-gray-600 dark:text-gray-400 text-xs mb-1">{dayjs(createdAt).from(dayjs())}</span> : null}
          {isAuthor && <button className="flex-grow-0 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs uppercase px-2 py-1" type="button" disabled={deleting} onClick={deleteHandler(id)}>delete</button>}
        </div>
      </div>
    )
  })}</>
}

export default PublicMessageList