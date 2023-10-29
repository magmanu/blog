import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Translate from '@docusaurus/Translate';
import Link from '@docusaurus/Link';

const FeatureList = [
    {
        link: '/tech',
        title: <Translate>What</Translate>,
        Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
        description: (
            <>
                <Translate>Code, cloud, pipelines, security...</Translate><br /><Translate>What I've been learning along the way.</Translate>
            </>
        ),
    },
    {
        link: '/personal',
        title: <Translate>Who</Translate>,
        Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
        description: (
            <>
                <Translate>The soul that powers the brain.</Translate><br /><Translate>The woman that fuels the code.</Translate>
            </>
        ),
    },
];

function Feature({ Svg, title, description, link }) {
    return (
        <div className={clsx('col col--6')}>
            <Link to={link}>
                <div className="text--center">
                <Svg className={styles.featureSvg} role="img" />
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
