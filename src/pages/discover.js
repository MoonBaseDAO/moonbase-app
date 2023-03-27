import { ArchiveBoxIcon, FolderIcon, PlusCircleIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from 'react';
import { Loading } from 'src/components/loading';
import { CreateDAOModal } from "src/components/modal/create-dao";
import { Pagination } from "src/components/pagination";
import { useNear } from 'src/hooks/use-near';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { getDaoId } from "src/utils/utility";

const itemsPerPage = 20;

const DiscoverPage = () => {
  const { factoryContract } = useNear();
  const [daoList, setDaoList] = useState([]);
  const [totalDaoCount, setTotalDaoCount] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchDaoList = async (start, limit) => {
    setLoading(true);
    const list = await factoryContract?.get_daos({ from_index: start, limit: limit });
    const count = await factoryContract?.get_number_daos();
    setTotalDaoCount(count);
    setDaoList(list);
    setLoading(false);
  }

  useEffect(() => {
    console.log(factoryContract);
    if (factoryContract)
      fetchDaoList((currentPage - 1) * itemsPerPage + 1, itemsPerPage);
  }, [factoryContract])

  useEffect(() => {
    fetchDaoList((currentPage - 1) * itemsPerPage + 1, itemsPerPage);
  }, [currentPage])

  return (
    <div className="my-6 px-4 sm:px-6 lg:px-8">
      {isLoading && <Loading />}
      <button
        type="button"
        className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 py-1.5 px-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => { setModalOpen(true) }}
      >
        <PlusCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
        Create DAO
      </button>
      <CreateDAOModal open={isModalOpen} setOpen={setModalOpen} />
      <ul role="list" className="mt-3 grid grid-cols-1 gap-6 sm:grid-cols-4 lg:grid-cols-4">
        {daoList?.map((daoAddr) => (
          <li key={daoAddr} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
            <div className="flex w-full items-center justify-between space-x-6 p-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="truncate text-sm font-medium text-gray-900">{getDaoId(daoAddr)}</h3>
                  <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                    DAO
                  </span>
                </div>
                <p className="mt-1 truncate text-sm text-gray-500">{daoAddr}</p>
              </div>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                  <a
                    href={'#'}
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    <ArchiveBoxIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    View
                  </a>
                </div>
                <div className="-ml-px flex w-0 flex-1">
                  <a
                    href={`/dao/${daoAddr}`}
                    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    <FolderIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    Select
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} itemsPerPage={itemsPerPage} totalCount={totalDaoCount} />
    </div>
  );
};

DiscoverPage.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default DiscoverPage;
