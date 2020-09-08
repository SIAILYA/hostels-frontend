import React, {useState} from "react";
import {Panel, PanelHeader, View} from "@vkontakte/vkui";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import FormLayoutGroup from "@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup";
import SelectMimicry from "@vkontakte/vkui/dist/components/SelectMimicry/SelectMimicry";

const AddForm = ({regionsList, citiesList, uniList, go, activePanel, selectedRegion, selectedCity, selectedUniversity}) => {
    const [activeFormPanel, setActiveFormPanel] = useState('location_panel');

    return (
        <View id="add_review_view" activePanel={activePanel}>
            <Panel id="location_panel">
                <PanelHeader>Расположение</PanelHeader>

                <FormLayout>
                    <FormLayoutGroup top="Общая инофрмация" bottom="Расскажите, к какому учебному заведению относится ваше общежитие">
                        <SelectMimicry
                            top="Выберите регион"
                            placeholder="Не выбран"
                            onClick={go}
                            data-goto='panel_region_choose'
                        >
                            {selectedRegion}
                        </SelectMimicry>

                        <SelectMimicry
                            top="Выберите город"
                            placeholder="Не выбран"
                            onClick={go}
                            data-goto='panel_city_choose'
                        >
                            {selectedRegion}
                        </SelectMimicry>

                        <SelectMimicry
                            top="Выберите ВУЗ"
                            placeholder="Не выбран"
                            onClick={go}
                            data-goto='panel_uni_choose'
                        >
                            {selectedRegion}
                        </SelectMimicry>
                    </FormLayoutGroup>
                </FormLayout>
            </Panel>
            <Panel id='region_choose'>
                <PanelHeader>Выбор региона</PanelHeader>

            </Panel>
            <Panel id='city_choose'>
                <PanelHeader>Выбор города</PanelHeader>

            </Panel>
            <Panel id='uni_choose'>
                <PanelHeader>Выбор ВУЗа</PanelHeader>

            </Panel>
        </View>
    )
}

export default AddForm;