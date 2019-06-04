import React, { Fragment, Component } from 'react';
import './Documents.css';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import { Button, Row, Card, Modal, InputGroup, FormControl, Alert } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { getMyDocs, uploadHrDocs, getMyDocsByUsername } from '../../../../utils/documents';
import { useDropzone } from 'react-dropzone';

const iconType = { document: "far fa-file-alt" }

export class Documents extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: '',
            modalContent: null,
            modalTitle: '',
            modalAuthor: '',
            searchBucketName: '',
            showAlert: '',
            alertText: '',
            hrDocs: null
        }

        this.handleShow = this.handleShow.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.handleDocClick = this.handleDocClick.bind(this);
        this.handleBucketSearch = this.handleBucketSearch.bind(this);
        this.handleHrUpload = this.handleHrUpload.bind(this);
    }

    async componentDidMount() {
        let hrDoc = await getMyDocs();

        if (hrDoc.status) {
            this.setState({ showAlert: "hrFiles", alertText: "Error: " + hrDoc.status + " - " + hrDoc.statusText });
            hrDoc = null;
        }

        this.setState({
            hrDocs: hrDoc
        });
    }

    handleShow(modalName) {
        this.setState({ showModal: modalName });
    };

    handleHide() {
        this.setState({
            showModal: '',
            modalContent: null,
            modalTitle: '',
            modalAuthor: '',
        });
    };

    closeAlert() {
        this.setState({
            showAlert: '',
            alertText: ''
        });
    }

    handleChange(event) {
        let field = event.target.name;
        let value = event.target.value;

        let changes = {};
        changes[field] = value;
        this.setState(changes);
    }

    handleDocClick(member) {
        this.setState({
            modalContent: member.content,
            modalTitle: member.title,
            modalAuthor: member.author
        });

        this.handleShow("doc");
    }

    async handleBucketSearch() {
        let myDocs = await getMyDocsByUsername(this.state.searchBucketName);

        if (myDocs.status === 400) {
            this.setState({ showAlert: "buckets", alertText: "No such bucket" });
        } else {
            this.setState({ showAlert: "buckets", alertText: "Something went wrong. Please try again." });
        }
    }

    async handleHrUpload(acceptedFiles) {
        let hrUpload = await uploadHrDocs(acceptedFiles);
        if (acceptedFiles.length !== 0 && hrUpload.Code === "500") {
            this.setState({ showAlert: "upload", alertText: JSON.stringify(hrUpload) });
        } else {
            this.setState({ showAlert: "upload", alertText: "Something went wrong. Please try again." });
        }
    }

    render() {

        let Basic = (props) => {
            const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

            const files = acceptedFiles.map(file => (
                <li key={file.path}>
                    {file.path} - {file.size} bytes
              </li>
            ));

            return (
                <Fragment>
                    <section className="documents__container">
                        <div {...getRootProps({ className: 'documents__dropzone' })}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                        <aside>
                            <h4 className="documents__dropzone-files">Files</h4>
                            <ul>{files}</ul>
                        </aside>
                    </section>
                    <Button variant="primary" className="documents__button" onClick={() => this.handleHrUpload(acceptedFiles)}>Submit</Button>
                </Fragment>
            );
        }

        let displayDocuments = (docsToDisplay) => {
            return (
                this.state[docsToDisplay].map((member, index) => {
                    return (
                        <Card key={member.by + index} className="documents__doc-card">
                            <div className="documents__card-file-type" onClick={() => this.handleDocClick(member)}><i className={iconType[member.docType]} style={{ fontSize: '5em' }} /></div>
                            <div className="documents__card-heading"><p>{member.title}</p></div>
                            <div className="documents__card-subtext"><p>{"edited by " + member.author}</p></div>
                        </Card>
                    );
                }))
        }

        return (
            <Fragment>

                <Modal show={(this.state.showModal === "doc")} onHide={this.handleHide} dialogClassName="documents__modal-wide" >
                    <Modal.Header closeButton> <Modal.Title>{this.state.modalTitle}</Modal.Title> </Modal.Header>
                    <Modal.Body>
                        <h4 className="documents__modal-author">{"by " + this.state.modalAuthor}</h4>
                        <ReactMarkdown source={this.state.modalContent} />
                    </Modal.Body>
                </Modal>

                <Modal show={(this.state.showModal === "upload")} onHide={this.handleHide} dialogClassName="documents__modal-wide">
                    <Modal.Header closeButton> <Modal.Title>Upload files to HR Nexus</Modal.Title> </Modal.Header>
                    <Alert show={(this.state.showAlert === "upload")} onClose={() => this.closeAlert()} dismissible variant="danger">
                        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                        <p>{this.state.alertText}</p>
                    </Alert>
                    <Basic />
                </Modal>

                <Accordion allowZeroExpanded={true} allowMultipleExpanded={true}>
                    <AccordionItem>
                        <AccordionItemHeading><AccordionItemButton>HR Documents</AccordionItemButton></AccordionItemHeading>
                        <AccordionItemPanel>
                            <Alert show={(this.state.showAlert === "hrFiles")} onClose={() => this.closeAlert()} dismissible variant="danger">
                                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                                <p>{this.state.alertText}</p>
                            </Alert>

                            <Row className="documents__button-row"><Button variant="primary" className="documents__button" onClick={() => this.handleShow("upload")}>Upload <i className="fas fa-arrow-up" style={{ fontSize: '1em' }} /></Button></Row>
                            <Row><h3 className="documents__sub-heading">New</h3></Row>
                            {(this.state['hrDocs'] !== undefined && this.state['hrDocs'] !== null) && displayDocuments('hrDocs')}
                        </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <AccordionItemHeading><AccordionItemButton>My Documents</AccordionItemButton></AccordionItemHeading>
                        <AccordionItemPanel>
                            <Alert show={(this.state.showAlert === "buckets")} onClose={() => this.closeAlert()} dismissible variant="danger">
                                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                                <p>{this.state.alertText}</p>
                            </Alert>

                            <Row className="documents__button-row">
                                <InputGroup className="mb-3 documents__input-group">
                                    <FormControl
                                        type="Text"
                                        placeholder="Find documents by bucket"
                                        name="searchBucketName"
                                        value={this.state.searchBucketName}
                                        onChange={(event) => { this.handleChange(event) }}
                                        onKeyPress={(event) => { if (event.key === "Enter") { this.handleBucketSearch() } }} />
                                    <InputGroup.Append>
                                        <Button variant="outline-secondary" onClick={() => { this.handleBucketSearch() }} > <i className="fab fa-bitbucket" /> </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Row>

                            <Row><h3 className="documents__sub-heading">Files</h3></Row>
                            {(this.state['myDocs'] !== undefined && this.state['myDocs'] !== null) ? displayDocuments('myDocs') : <div className="documents__empty-files" />}
                        </AccordionItemPanel>
                    </AccordionItem>

                </Accordion>
            </Fragment >
        );
    }
}

