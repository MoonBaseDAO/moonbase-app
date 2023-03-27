import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import MsgBox from '@/components/messages/msgbox';
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline';
import { useGetMessages, usePostMessage } from '@/hooks/useApi';
import { useEffect } from 'react';

const MessagesPage = () => {
  const { loading, data, getAxios } = useGetMessages();
  const { postAxios } = usePostMessage();
  if (loading) return <h1>Loading</h1>;
    
  const handleMessage = async (message) => {
    await postAxios(message);
    await getAxios();
  };

  return (
    <>
      <div className="flow-root p-5">
        <ul role="list" className="-mb-8">
          {data.list?.map((userMsg, idx) => (
            <li key={idx}>
              <div className="relative pb-8">
                {/* {idx !== activity.length - 1 ? (
                  <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                ) : null} */}
                <div className="relative flex items-start space-x-3">
                  <div className="relative">
                    <img
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
                      src={`https://randomuser.me/api/portraits/men/${idx}.jpg`}
                      alt=""
                    />

                    <span className="absolute -bottom-0.5 -right-1 rounded-tl bg-white px-0.5 py-px">
                      <ChatBubbleLeftEllipsisIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div>
                      <div className="text-sm">
                        <a href={'#'} className="font-medium text-gray-900">
                          {userMsg.senderId[0]?.name}
                        </a>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Commented {new Date().toISOString().substring(0, 10)}</p>
                    </div>
                    <div className="mt-2 text-sm text-gray-700">
                      <p>{userMsg.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className='p-10'>
        <MsgBox onMessage={handleMessage} />
      </div>
    </>
  );
}

MessagesPage.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default MessagesPage;