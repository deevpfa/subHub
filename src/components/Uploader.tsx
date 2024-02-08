import { ACCEPT_FORMAT_IMG, ACCEPT_SIZE_IMG } from '@/constants/common'
import empty from "../../public/images/empty.jpeg";
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import Button from './MyButton';
import { useTranslation } from 'react-i18next';
import Image from "next/image";
import { classNames } from '@/functions/classNames';

interface iProps {
    onChange: (avatar: File) => void
    isFetching?: boolean
    image?: string
    className? : string
}

const Uploader = ({ onChange, isFetching, image , className }: iProps) => {
    const { t } = useTranslation("global");

    return (
            <div className={classNames('col-span-full flex items-center gap-x-3', className)}>
                <div className="flex flex-shrink-0 items-center px-4">
                    <Image
                        width={72}
                        height={72}
                        priority={true}
                        className="inline-block h-24 w-24 rounded-full"
                        src={image ? image : empty}
                        alt="profile-image"
                    />
                </div>
                <div>

                <Button type="button" className={classNames("bg-black/10  text-black shadow-sm hover:bg-black/20", isFetching ? 'pointer-events-none' : '')} size="sm">
                    <label htmlFor="dropzone-file" className="cursor-pointer">
                        {isFetching ? t(`global.uploading_photo`) : t(`global.upload_photo`)}
                        <input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            accept={ACCEPT_FORMAT_IMG}
                            size={ACCEPT_SIZE_IMG}
                            onChange={({ target }) => {
                                if (target.files && target.files.length > 0) {
                                    const file = target.files[0];
                                    onChange(file)
                                }
                            }}
                        />
                    </label>
                </Button>
                <p className="mt-2 text-xs leading-5 text-gray-400">{t(`profile.image_requirements`)}</p>
                </div>
            </div>
    )
}

export default Uploader