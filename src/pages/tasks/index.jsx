import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import Board from "@/components/tasks/board";
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline';
import { useGetTasks, usePostTasks } from '@/hooks/useTasksApi';
import { useEffect } from 'react';
// sneaky ninja..
const TasksPage = () => {
  const { loading, data, getAxios } = useGetTasks();
  const { postAxios } = usePostTasks();
  if (loading) return <h1>Loading</h1>;
    
  const handleTask = async (task) => {
    await postAxios(task);
    await getAxios();
  };

  return (
    <>
      <div className="p-5">
        <Board />
      </div>
    </>
  );
}

TasksPage.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
// hack hack!! @psyferpunk
export default TasksPage;
