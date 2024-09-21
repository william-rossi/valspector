'use client'

import React from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'
import { SvgLinkedin, SvgGithub, SvgEmail } from '@/svgs/icons'
import router from 'next/router'

interface ContactProps {
    svg: JSX.Element
    link: string
}

export default function Footer() {
    const contacts: ContactProps[] = [
        {
            link: "https://www.linkedin.com/in/william-ruiz-550388296/",
            svg: <SvgLinkedin />
        },
        {
            link: "https://github.com/william-rossi",
            svg: <SvgGithub />
        }
    ]

    return (
        <footer className={styles.container}>
            <div className={styles.subContainer}>
                <Link className={styles.play} target='_blank' href={'https://playvalorant.com/pt-br/'}>PLAY VALORANT</Link>
                <small>© {new Date().getFullYear()} - VALSPECTOR</small>
                <div className={styles.contacts}>
                    {
                        contacts.map((item, index) => (
                            <Link key={index} target='_blank' href={item.link} className={styles.contact}>
                                {item.svg}
                            </Link>
                        ))
                    }
                    <div title='william.ruiz.work.br@gmail.com' onClick={() => router.push('mailto:william.ruiz.work.br@gmail.com')} className={styles.contact}>
                        <SvgEmail />
                    </div>
                </div>
                <label>Next.js</label>
            </div>
        </footer>
    )
}
