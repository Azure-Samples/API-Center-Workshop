import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Inventory',
    Svg: require('@site/static/img/inventory.svg').default,
    description: (
      <>
        At the foundation of API Center is building a complete and up-to-date inventory of all APIs built and used throughout the organization.
      </>
    ),
  },
  {
    title: 'Governance',
    Svg: require('@site/static/img/governance.svg').default,
    description: (
      <>
       Now, with a complete API inventory, we need to look into how we can ensure these APIs are consistent, standardized, usable, and secure.
      </>
    ),
  },
  {
    title: 'Discovery & Consumption',
    Svg: require('@site/static/img/consumption.svg').default,
    description: (
      <>
        API consumers can discover, try, and consume APIs directly inside Visual Studio Code or through a self-hosted web-based API Center portal.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
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
