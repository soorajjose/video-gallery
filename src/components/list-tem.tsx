import * as React from 'react';

export interface ListItemProps {
    name?: string
    imageUrl?: string
}

class ListItem extends React.Component<ListItemProps, {}> {
    render() {
        return <div className="flex   flex-col h-auto mb-6 pr-3 w-1/3 ">
            <img className="h-auto w-ful" alt={this.props.name} src={require(`./../assets/${this.props.imageUrl}`)}
                onLoad={() => this.setState({ isImageLoaded: true })} />
            <div className="pt-2 text-white">
                <span>{this.props.name}</span>
            </div>
        </div>
    }
}
export default ListItem