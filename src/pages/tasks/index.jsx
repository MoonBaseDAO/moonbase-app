import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import Board from "@/components/tasks/board";

const TasksPage = () => {
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

export default TasksPage;