import { FC, Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import Button from './MyButton'
import { subtle } from 'crypto'

export interface iModal {
    children?: any
    openModal: boolean
    onConfirm: () => void
    onClosed: (open: boolean) => void
    fetching: boolean
    confirmButtonText?: string
}

export const Modal: FC<iModal> = ({ fetching = false, openModal, onClosed: onClosed, children , onConfirm: onConfirm, confirmButtonText}) => {
    const [open, setOpen] = useState(false);
    const [isFetching, setisFetching] = useState(false);

    useEffect(() => {
        setOpen(openModal);
        setisFetching(fetching)
    }, [openModal , fetching])

    const handleConfirm = () => {
        onConfirm && onConfirm();
        setisFetching(true);
    }

    const handleOpen = () => {
        setOpen(!open);
        onClosed && onClosed(!open);
    };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => handleOpen()}>
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                <>
                                    { children }
                                </>
                                {/* } */}
                                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                    <Button
                                        type="submit"
                                        isFetching={isFetching}
                                        onClick={() => handleConfirm()}
                                        className="mt-3 inline-flex w-full justify-center sm:ml-3 sm:w-auto"
                                    > {confirmButtonText}</Button>

                                    <Button
                                        type="button"
                                        color={'white'}
                                        className="mt-3 inline-flex w-full justify-center sm:ml-3 sm:w-auto ring-1 ring-inset ring-gray-300"
                                        onClick={() => handleOpen()}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
