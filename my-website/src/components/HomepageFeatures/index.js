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
        Png: tech_img[getRandomInt(length)],
        description: (
            <Translate>What I've been learning in the field.</Translate>
        ),
    },
    {
        link: '/personal',
        title: <Translate>Who</Translate>,
        Png: personal_img[getRandomInt(length)],
        description: (
            <>
                <Translate>The soul that powers the brain.</Translate>
            </>
        ),
    },
];

function Feature({ Png, title, description, link }) {
    return (
        <div className={clsx('col col--6')}>
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

export default function HomepageFeatures() {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
