import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
} from 'react-native';

export default class SubCategories extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            cat_id: this.props.route.params.id,
            navigation: this.props.navigation,
        };
    }

    componentDidMount() {
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        const url =
            'https://malamalexpress.com/wc-api/v3/products/categories?consumer_key=ck_af6dae0d921e12528b92964fb526317370642ec1&consumer_secret=cs_d172a15e6fa946ccc01890ca6adec67e3724e667';
        this.setState({ loading: true });

        fetch(url)
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    data: res.product_categories,
                    loading: false,
                });
            })
            .catch((error) => {
                this.setState({ error, loading: false });
            });
    };





    render() {


        const renderItem = ({ item }) => {

            if (item.parent == this.state.cat_id) {
                return (
                    <TouchableOpacity
                        onPress={() => {
                            this.state.navigation.navigate('Products', {
                                categorySlug: item.slug,
                                id: item.id
                            });
                        }}>
                        <View
                            style={{
                                height: 120,
                                width: 123,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'white',
                                margin: 4,
                                borderRadius: 10,
                                shadowColor: '#222',
                                shadowOffset: { width: 0.5, height: 0.5 },
                                shadowOpacity: 0.5,
                                shadowRadius: 10,
                                elevation: 2,
                            }}>
                            <Text style={{ fontSize: 16 }}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                );
            }
            // else {
            //     this.state.navigation.navigate('Products', {
            //         categorySlug: item.slug,
            //         id: item.id
            //     });
            // }


        };

        const keyExtractor = (item) => String(item.id);

        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ padding: 10 }}>
                    {this.state.loading && this.state.data.length == 0 ? (
                        <ActivityIndicator />
                    ) : (
                            <FlatList
                                data={this.state.data}
                                renderItem={renderItem}
                                keyExtractor={keyExtractor}
                                numColumns={3}
                            />
                        )}
                </View>
            </View>
        )
    }
}
