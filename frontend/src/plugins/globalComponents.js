import Badge from "../components/Badge";
import BaseAlert from "../components/BaseAlert";
import BaseButton from "../components/BaseButton";
import BaseCheckbox from "../components/BaseCheckbox";
import BaseInput from "../components/BaseInput";
import BasePagination from "../components/BasePagination";
import BaseProgress from "../components/BaseProgress";
import BaseRadio from "../components/BaseRadio";
import BaseSlider from "../components/BaseSlider";
import BaseSwitch from "../components/BaseSwitch";
import Card from "../components/Card";
import Icon from "../components/Icon";
import Messenger from "../components/Messenger";
import FileUpload from "../components/FileUpload";
import FileDownload from "../components/FileDownload";
import LoginDialog from '../components/LoginDialog';

export default {
    install(Vue) {
        Vue.component(Badge.name, Badge);
        Vue.component(BaseAlert.name, BaseAlert);
        Vue.component(BaseButton.name, BaseButton);
        Vue.component(BaseInput.name, BaseInput);
        Vue.component(BaseCheckbox.name, BaseCheckbox);
        Vue.component(BasePagination.name, BasePagination);
        Vue.component(BaseProgress.name, BaseProgress);
        Vue.component(BaseRadio.name, BaseRadio);
        Vue.component(BaseSlider.name, BaseSlider);
        Vue.component(BaseSwitch.name, BaseSwitch);
        Vue.component(Card.name, Card);
        Vue.component(Icon.name, Icon);
        Vue.component(Messenger.name, Messenger);
        Vue.component(FileUpload.name, FileUpload);
        Vue.component(FileDownload.name, FileDownload);
        Vue.component(LoginDialog.name, LoginDialog);
    }
};