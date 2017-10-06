import React, { Component, PropTypes } from "react";
import EditAddressPopover from "./EditAddressPopover";

export default class EditAddress extends Component {
  static propTypes = {
    address: PropTypes.object.isRequired,
    _toggleSelectAddressModal: PropTypes.func.isRequired,
    ballot_location_chosen: PropTypes.bool.isRequired,
    ballot_location_display_name: PropTypes.string,
    election_day_text: PropTypes.string,
    election_is_upcoming: PropTypes.bool.isRequired,
    google_civic_data_exists: PropTypes.bool.isRequired,
    voter_entered_address: PropTypes.bool.isRequired,
    voter_specific_ballot_from_google_civic: PropTypes.bool.isRequired,
  };

  constructor (props, context) {
    super(props, context);
    this.state = {
      ballot_location_chosen: false,
      ballot_location_display_name: "",
      election_day_text: "",
      election_is_upcoming: false,
      google_civic_data_exists: false,
      show_ballot_status: true,
      voter_entered_address: false,
      voter_specific_ballot_from_google_civic: false,
    };
  }

  componentDidMount () {
    // console.log("In BallotStatusMessage componentDidMount");
    this.setState({
      ballot_location_chosen: this.props.ballot_location_chosen,
      ballot_location_display_name: this.props.ballot_location_display_name,
      election_day_text: this.props.election_day_text,
      election_is_upcoming: this.props.election_is_upcoming,
      google_civic_data_exists: this.props.google_civic_data_exists,
      show_ballot_status: true,
      voter_entered_address: this.props.voter_entered_address,
      voter_specific_ballot_from_google_civic: this.props.voter_specific_ballot_from_google_civic,
    });
  }
  componentWillReceiveProps (nextProps) {
    // console.log("BallotStatusMessage componentWillReceiveProps");
    this.setState({
      ballot_location_chosen: nextProps.ballot_location_chosen,
      ballot_location_display_name: nextProps.ballot_location_display_name,
      election_day_text: nextProps.election_day_text,
      election_is_upcoming: nextProps.election_is_upcoming,
      google_civic_data_exists: nextProps.google_civic_data_exists,
      show_ballot_status: true,
      voter_entered_address: nextProps.voter_entered_address,
      voter_specific_ballot_from_google_civic: nextProps.voter_specific_ballot_from_google_civic,
    });
  }

  render () {
    let address = this.props.address.text_for_map_search || "";
    let edit_address_popover_on = true;

    if (address.length) {
      return (
        <span className="ballot__date_location">
          { edit_address_popover_on ?
            <EditAddressPopover address={address}
                                placement={"bottom"}
                                onEnterAddressClick={this.props._toggleSelectAddressModal}
                                ballot_location_chosen={this.state.ballot_location_chosen}
                                 ballot_location_display_name={this.state.ballot_location_display_name}
                                 election_day_text={this.state.election_day_text}
                                 election_is_upcoming={this.state.election_is_upcoming}
                                 voter_entered_address={this.state.voter_entered_address}
                                 google_civic_data_exists={this.state.google_civic_data_exists}
                                 voter_specific_ballot_from_google_civic={this.state.voter_specific_ballot_from_google_civic} /> :
            <span>{ address }</span>
          }
          <span className="hidden-print">(<a onClick={this.props._toggleSelectAddressModal}>Edit</a>)</span>
        </span>
      );
    } else {
      return (
        <span className="ballot__date_location">
          In order to see your ballot, please enter your address.
          <span className="hidden-print">&nbsp;(<a onClick={this.props._toggleSelectAddressModal}>Add Your Address</a>)</span>
        </span>
      );
    }
  }
}
