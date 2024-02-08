import Head from "next/head";
import { FC } from "react";
import logo from '../../../public/favicon.ico'

export const HeadComponent: FC<{title:string | null}> = ({ title }) => {
    return (
        <>
            <Head>
                <title>{title || 'SubHub'}</title>
                <meta name="author" content="" />
                <link rel="shortcut icon" href='images/mapa.png' />
                <meta name="description" content="" />
                <meta name="keywords" content="SubHub" />
            </Head>
        </>
    )
}
