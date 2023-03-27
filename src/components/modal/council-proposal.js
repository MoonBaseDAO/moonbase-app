import { Dialog, Transition } from '@headlessui/react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Fragment, useRef } from 'react';
import { useNear } from 'src/hooks/use-near';
import { yoktoNear } from 'src/utils/utility';

export const CouncilModalType = {
  ADD: 1,
  REMOVE: 2
};

export const CouncilProposalModal = ({ addr, proposalBond, open, setOpen, councilType = CouncilModalType.ADD }) => {
  const cancelButtonRef = useRef(null)
  const { getDaoContract } = useNear();
  const councilRef = useRef(null);
  const descRef = useRef(null);

  const hanldeAddProposal = async () => {
    const contract = getDaoContract(addr);
    const council = councilRef.current.value;
    const description = descRef.current.value;
    console.log(proposalBond.toString());
    if(councilType == CouncilModalType.ADD) {
      await contract.add_proposal(
        {
          proposal: {
            description: description.trim(),
            kind: {
              AddMemberToRole: {
                member_id: council,
                role: 'council'
              }
            }
          }
        },
        BigInt('30000000000000').toString(),
        proposalBond.toString()
      );
    } else {
      await contract.add_proposal(
        {
          proposal: {
            description: description.trim(),
            kind: {
              RemoveMemberFromRole: {
                member_id: council,
                role: 'council'
              }
            }
          }
        },
        BigInt('30000000000000').toString(),
        proposalBond.toString()
      );
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                      <InformationCircleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 flex-1 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        {councilType == CouncilModalType.ADD ? 'Add' : 'Remove'} {' '} Council Member
                      </Dialog.Title>
                      <div>
                        <div className="mt-2">
                          <input
                            ref={councilRef}
                            type="text"
                            name="account_name"
                            id="account_name"
                            className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Enter account"
                          />
                        </div>
                        <div className="mt-2">
                          <input
                            ref={descRef}
                            type="text"
                            name="desc"
                            id="desc"
                            className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Enter Description"
                          />
                        </div>
                        <div className='mt-2'>
                          <div className='bg-blue-100 text-blue-800 rounded-lg px-2 py-1 w-full text-center'>
                            You will pay a deposit of <span className="text-base">Ⓝ</span>
                            {(proposalBond / yoktoNear).toFixed(2)}{' '}
                            to add this proposal!
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                    onClick={hanldeAddProposal}
                  >
                    Add Proposal
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}