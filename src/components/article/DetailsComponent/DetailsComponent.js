import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedDate, FormattedMessage } from 'react-intl';
import { LoadingComponent } from '../../index';
import { Tabs, Tab, Tooltip } from 'carbon-components-react';
import styles from './DetailsComponent.module.scss';
import { Document32 } from '@carbon/icons-react';

function DetailsComponent({ match, fetchArticle, selectedArticle, error, loading, intl }) {

    useEffect(() => {
        /**
         * Calls this action on first time load (componentDidMount)
         */
        fetchArticle(match.params.id);//'fa9519d5-0363-4b8d-8e1f-627d802c08a8'
    }, []);

    if (error && !loading) {
        throw error;
    } else if (!error && !loading && selectedArticle && selectedArticle.id) {
        const tooltipDate = <Tooltip direction="bottom" tabIndex={0} >
            <p>{intl.formatMessage({id: "detailsComponent.dateTooltip"})}</p>
        </Tooltip>;
        const tooltipTextForBodySection = <Tooltip direction="bottom" tabIndex={0} >
            <p>{intl.formatMessage({id: "detailsComponent.bodySectionTooltip"})}</p>
        </Tooltip>;
        return (<React.Fragment>
            <div data-testid="detailsComponent" className="container">
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <div className={styles.label}></div>
                            <div className={styles.label + ' ' + styles.heading}><Document32 className={styles.iconSpacing} />{selectedArticle.name}</div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <div className="row">
                            <div className={styles.label}><FormattedMessage id="detailsComponent.topicTitle" defaultMessage="Topic title"></FormattedMessage></div>
                            <div className={styles.value}>{selectedArticle.elements.heading.value}</div>
                        </div>
                        <div className="row">
                            <div className={styles.label}><FormattedMessage id="detailsComponent.authorName" defaultMessage="Author name"></FormattedMessage></div>
                            <div className={styles.value}>{selectedArticle.elements.author.value}</div>
                        </div>
                        <div className="row">
                            <div className={styles.label}><FormattedMessage id="detailsComponent.date" defaultMessage="Date"></FormattedMessage> * {tooltipDate}</div>
                            <div className={styles.value}>
                                <FormattedDate day="numeric" month="long" year="numeric" hour="numeric" minute="numeric" value={new Date(selectedArticle.elements.date.value)}></FormattedDate>
                            </div>
                        </div>
                        <div className="row">
                            <div className={styles.label}><FormattedMessage id="detailsComponent.leadImage" defaultMessage="Lead image"></FormattedMessage></div>
                            <div className={styles.value}>
                                <a href={"https://content-eu.goacoustic.com/api/authoring" + (selectedArticle.elements.mainImage.value.leadImage.asset.resourceUri.substring((selectedArticle.elements.mainImage.value.leadImage.asset.resourceUri.indexOf('/v1/')), selectedArticle.elements.mainImage.value.leadImage.asset.resourceUri.length))} target="_blank">{selectedArticle.elements.mainImage.value.leadImage.asset.fileName}</a>

                            </div>
                        </div>
                        <div className="row">
                            <div className={styles.label}><FormattedMessage id="detailsComponent.leadImageCaption" defaultMessage="Lead image caption"></FormattedMessage></div>
                            <div className={styles.value}>{selectedArticle.elements.mainImage.value.leadImageCaption.value}</div>
                        </div>
                        <div className="row">
                            <div className={styles.label}><FormattedMessage id="detailsComponent.LeadImageCredit" defaultMessage="Lead image credit"></FormattedMessage></div>
                            <div className={styles.value}>{selectedArticle.elements.mainImage.value.leadImageCredit.value}</div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            <div className={styles.label}><FormattedMessage id="detailsComponent.profiles" defaultMessage="Profiles"></FormattedMessage></div>
                            <div className={styles.value}>
                                <div style={{ width: '100%', height: '100%' }}>
                                    <Tabs>
                                        <Tab href="#" id="tab-1" label={intl.formatMessage({id: "detailsComponent.default"})} >
                                            <div className="some-content">
                                                <img src="https://images.unsplash.com/photo-1588702547919-26089e690ecc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" />
                                            </div>
                                        </Tab>
                                        <Tab href="#" id="tab-2" label={intl.formatMessage({id: "detailsComponent.lead"})} >
                                            <div className="some-content">
                                                <img src="https://images.unsplash.com/photo-1588702547919-26089e690ecc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=550&q=80" />
                                            </div>
                                        </Tab>
                                        <Tab href="#" id="tab-3" label={intl.formatMessage({id: "detailsComponent.card"})} >
                                            <div className="some-content">
                                                <img src={"https://images.unsplash.com/photo-1588702547919-26089e690ecc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=80"} />
                                            </div>
                                        </Tab>
                                    </Tabs>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <div className={styles.label}><FormattedMessage id="detailsComponent.textForBodySection" defaultMessage="Text for body section"></FormattedMessage> {tooltipTextForBodySection}</div>
                            <div className={styles.value}>{
                                selectedArticle.elements.body.values.map((paragraphItem, index) => {
                                    const extracted = paragraphItem.replace('<p>', '').replace('</p>', '');
                                    return (<p key={index} className={styles.textForBodySectionParagraph}>{extracted}</p>)
                                })
                            }</div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>);
    } else {
        return (<LoadingComponent></LoadingComponent>); 
    }
}

DetailsComponent.propTypes = {
    intl: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    fetchArticle: PropTypes.func.isRequired,
    selectedArticle: PropTypes.object,
    error: PropTypes.object,
    loading: PropTypes.bool
}

export default injectIntl(React.memo(DetailsComponent));
