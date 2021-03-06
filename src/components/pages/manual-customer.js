import React from "react";
import FlowInput from "../subcomponents/input/flow-input";
import MainHeader from "../subcomponents/header/main-header";
import GeneralButton from "../subcomponents/button/general-btn";
import { connect } from "react-redux";
import { setPageID } from "../../store/actions";
import {
  PAGE_INDEX,
  BUTTON_LABELS,
  HEADERS,
  INPUT_LABELS,
  BUTTON_MODES
} from "../constant";

class ManualCustomer extends React.Component {
  render() {
    const { onClickContinue } = this.props;
    const InputsView = (
      <div className="input-fields p-3 text-center">
        <FlowInput label={INPUT_LABELS.firstName} />
        <FlowInput label={INPUT_LABELS.lastName} />
        <FlowInput label={INPUT_LABELS.street} />
        <FlowInput label={INPUT_LABELS.house} />
        <FlowInput label={INPUT_LABELS.zipCode} />
        <FlowInput label={INPUT_LABELS.city} />
      </div>
    );

    const ButtonView = (
      <div className="text-center mt-3">
        <GeneralButton
          label={BUTTON_LABELS.continue}
          mode={BUTTON_MODES.confirm}
          onClick={onClickContinue}
        />
      </div>
    );

    return (
      <div className="p-4">
        <MainHeader title={HEADERS.manualDriverInfo} />
        {InputsView}
        {ButtonView}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClickContinue: () => dispatch(setPageID(PAGE_INDEX.CHOOSE_LICENSE_PLATE))
  };
};

export default connect(null, mapDispatchToProps)(ManualCustomer);
