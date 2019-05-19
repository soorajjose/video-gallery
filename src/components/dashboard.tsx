import * as React from 'react'
import { getGalleryList } from './../actions/gallery-actions'
import { connect } from 'react-redux'
import { Gallery } from './../model'
import ListItem from './list-tem'
import BackArrow from './../assets/Back.png'
import SeacrhIcon from './../assets/search.png'

interface DashboardProps {
    galleryData: Array<Gallery>
    onGetGalleryList(items: string): void
}

interface DashboardState {
    isImageLoaded: boolean,
    galleryData: Array<Gallery>,
    count: number,
    isSearchEnabled: boolean
}

class Dashboard extends React.Component<DashboardProps, DashboardState> {

    constructor(props: any) {
        super(props)
        this.state = {
            count: 1,
            isImageLoaded: false,
            galleryData: this.props.galleryData || [],
            isSearchEnabled: false
        }
    }

    componentWillReceiveProps(nextProps: any) {
        this.setState({
            galleryData: nextProps.galleryData
        })
    }

    componentDidMount() {
        this.dispatchAction()
    }

    dispatchAction() {
        if (this.state.count <= 3) {
            if (this.props.onGetGalleryList) {
                this.props.onGetGalleryList(this.state.count.toString())
                this.setState({
                    count: this.state.count + 1
                })
            }
        }
    }

    renderHeader() {
        return <div className="flex h-16 pt-3 w-full flex-wrap">
            <div className="flex flex-auto items-center justify-between px-3 pt-2">
                <div className="items-center flex h-auto w-4/5">
                    <img src={BackArrow} className="h-4 w-4" alt="Back" onClick={this.handleBackButtonClick} />
                    {!this.state.isSearchEnabled ? <span className="px-3 tex-sm text-white">Romantic Comedy</span>
                        : <input autoFocus className=" w-full  rounded-sm py-1 outline-none border-solid border-all-2 pl-1 ml-3" type="text" onChange={this.handleSearch} />}
                </div>
                <div className="h-auto w-auto">
                    <img src={SeacrhIcon} className="h-4 w-4" alt="Search" onClick={this.onSearchButtonTapped.bind(this)} />
                </div>
            </div>
        </div>
    }

    handleBackButtonClick = () => {
        this.setState({
            isSearchEnabled: false,
            galleryData: this.props.galleryData

        })
    }

    handleScroll = (event: any) => {
        let scrollContainer = event.target
        if (scrollContainer.offsetHeight + scrollContainer.scrollTop >= scrollContainer.scrollHeight - 5) {
            this.dispatchAction()
        }
    }

    handleSearch = (event: any) => {
        const value = (event.target.value || '').toLowerCase()

        let searchResult = (this.props.galleryData || []).filter((item) => {
            return ((item.name || '').toLowerCase()).includes(value)
        })

        this.setState({
            galleryData: searchResult
        })
    }

    onSearchButtonTapped = () => {
        this.setState({
            isSearchEnabled: true
        })
    }

    renderGalleryView() {
        let innerGalleryCell = this.state.galleryData.map((dataItem, index) => {
            return <ListItem key={index} imageUrl={dataItem.imageUrl || ''} name={dataItem.name || ''} />
        })

        return <div className="h-full overflow-y-scroll sm:scrolling-touch bg-black text-xs" onScroll={this.handleScroll}>
            <div className="flex flex-wrap pt-3 pl-3">
                {innerGalleryCell}
            </div>
        </div>
    }

    render() {
        return <div className="flex w-full h-full sm:tex-lg  font-light">
            <div className="flex  h-full flex-col flex-auto">
                {this.renderHeader()}
                {this.renderGalleryView()}
            </div>
        </div>
    }
}

const maptStateToProps = (state: any) => {
    return {
        galleryData: state.galleryData
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        onGetGalleryList: (items: string) => dispatch(getGalleryList(items))
    }
}

export default connect(maptStateToProps, mapDispatchToProps)(Dashboard)