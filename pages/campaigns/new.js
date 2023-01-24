import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class CampaignNew extends Component {

    state = {
        minimumContributon: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({ loading: true, errorMessage: '' });
        // NOTE: Assumes user has at least 1 account and uses the first
        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .createCampaign(this.state.minimumContributon).send({
                    from: accounts[0]
                });

            Router.pushRoute('/');
        } catch (err) {
            this.setState({ errorMessage: err.message });

        }
        this.setState({ loading: false });
    };

    render() {
        return (
            <Layout>
                <h3>Create New Campaign</h3>

                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Minimum Contributon</label>
                        <Input
                            value={this.state.InputminimumContributon}
                            onChange={event => this.setState({ minimumContributon: event.target.value })}
                            label="wei"
                            labelPosition="right" />
                    </Form.Field>
                    <Message error header="Oops!" content={this.state.errorMessage} />
                    <Button primary loading={this.state.loading}>Create!</Button>
                </Form>
            </Layout>
        );
    }
}
export default CampaignNew;