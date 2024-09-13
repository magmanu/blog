import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Translate from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import { tech_img, personal_img } from '@site/src/components/Icons'

const length = tech_img.length;
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const FeatureList = [
    {
        link: '/tech',
        title: <Translate>What</Translate>,
        // Png: tech_img[getRandomInt(length)],
        Png: tech_img[0],
        description: (
            <Translate>What I've been learning in the field.</Translate>
        ),
    },
    {
        link: '/personal',
        title: <Translate>Who</Translate>,
        // Png: personal_img[getRandomInt(length)],
        Png: personal_img[1],
        description: (
            <Translate>The soul that powers the brain.</Translate>
        ),
    },
];

function Feature({ Png, title, description, link }) {
    return (
        <div className={clsx('col col--3')}>
            <Link to={link}>
                <div className="text--center">
                    <img src={Png} className={styles.pngContainer} alt="img" />
                </div>
                <div className="text--center padding-horiz--md">
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>
            </Link>
        </div>
    );
}


export function Microblog({ content }) {
    // https://stackoverflow.com/questions/64363561/refresh-data-received-from-an-api-every-minute-react-javascript
    // https://stackoverflow.com/questions/14848274/git-log-to-get-commits-only-for-a-specific-branch
    return (
        <div className={clsx('col col--3')}>
            <div class="microblog margin-bottom--md" aria-label="Microblog"><b>Microblog</b></div>
                <div class={styles.microblog}>
                    <ul class="microblog sidebarItemList_Yudw clean-list">
                        <li class="microblog sidebarItem__DBe">
                            <p>Tweeting1Tweeting1Tweeting1Tweeting1Tweeting1Tweeting1Tweeting1Tweeting1Tweeting1</p>
                            <p>Tweeting2</p>
                            <p>Tweeting3</p>
                            <p>Tweeting4</p>
                            <p>Tweeting5</p>
                        </li>
                    </ul>
            </div >
        </div>
    )
}

export default function HomepageFeatures() {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                <div className={clsx('col col--3')}></div>
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                    {/* <Microblog /> */}
                </div>
            </div>
        </section>
    );
}
