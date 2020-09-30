import React, {useContext, useEffect, useRef, useState} from "react";
import {useDropzone} from 'react-dropzone';

import {
    Avatar, Button, Caption,
    Card,
    CardScroll, Checkbox,
    Div,
    File,
    FormLayout, FormLayoutGroup,
    FormStatus,
    Panel,
    PanelHeader, Placeholder,
    Textarea,
} from "@vkontakte/vkui";
import Icon24CameraOutline from '@vkontakte/icons/dist/24/camera_outline';
import Icon56GalleryOutline from '@vkontakte/icons/dist/56/gallery_outline';
import Icon56CameraOffOutline from '@vkontakte/icons/dist/56/camera_off_outline';
import {LocationContext, ModalContext, Navigation} from "../Contexts";


const TextPhotoPanel = ({id}) => {
    const {go} = useContext(Navigation)
    const {setPhotoCaptionIndex, setPhotoCard, photoCaptions, userPhotos, setUserPhotos} = useContext(ModalContext)
    const {locationSnackbar, setTextReview, textReview, anonReview, setAnon} = useContext(LocationContext)
    const {getInputProps} = useDropzone();

    const [previews, setPreviews] = useState([])
    const prevUserPhotos = useRef([])

    useEffect(() => {
        setPreviews([])
        prevUserPhotos.current = userPhotos
        for (let i = 0; i < prevUserPhotos.current.length; i++){
            const new_preview = URL.createObjectURL(prevUserPhotos.current[i])
            setPreviews(prevState => [...prevState, new_preview])
            photoCaptions.push('')
        }
    }, [userPhotos, photoCaptions])

    return(
        <Panel id={id}>
            <PanelHeader>Отзыв</PanelHeader>

            <Div>
                <FormStatus mode='default' header='Скажите пару слов'>
                    Напишите небольшой отзыв, который увидят все пользователи сервиса.<br/><br/>
                    <i>- О чем написать?</i><br/>
                    - Расскажите о том, как долго добираетесь до места учебы, с какими трудностями столкнулись при заселении,
                    отметьте плюсы и минусы общежития.
                </FormStatus>

                {/*{...getRootProps({ className: 'dropzone' })}*/}
                <FormLayout>
                    <Textarea
                        top="Отзыв об общежитии"
                        placeholder="Я (не) люблю это обжежитие за..."
                        defaultValue={textReview}
                        onChange={e => {
                            setTextReview(e.target.value)
                        }}
                    />
                    <Div>
                        <div
                            style={{
                                minHeight: '100px',
                                border: 'dashed 3px var(--accent)',
                                borderRadius: '15px',
                                overflow: 'hidden'
                            }}
                        >
                            <Placeholder
                                icon={<Icon56GalleryOutline className="yellow-color"/>}
                                header="Загрузите фотографии"
                                className="upload-photo"
                                action={
                                    <File top="Загрузите фотографии общежития"
                                          className='yellow-gradient'
                                          before={<Icon24CameraOutline />}
                                          controlSize="l"
                                          multiple
                                          accept="image/*"
                                          onInput={e => setUserPhotos(prev => [...prev, ...e.currentTarget.files])}
                                    >
                                        Открыть галерею
                                    </File>
                                }
                            >
                            </Placeholder>
                            <input
                                {...getInputProps()}
                                onInput={e => setUserPhotos(prev => [...prev, ...e.currentTarget.files])}
                            />
                        </div>
                    </Div>
                </FormLayout>
                <FormLayout>
                    <FormLayoutGroup top="Загруженные фото" bottom={previews.length > 0 && "Нажмите на фото чтобы добавить описание"}>
                        {/*TODO: Удаление фото*/}
                        {/*TODO: Загрузка фото сразу же*/}
                        {previews.length > 0 ?
                        <CardScroll style={{minHeight: '90px'}}>
                            {
                                previews.map((preview, index) => {
                                    return (
                                        <Card key={index} size='m'>
                                            <Avatar
                                                size={80}
                                                mode="app"
                                                src={preview}
                                                style={{objectFit: 'cover'}}
                                                onClick={() => {
                                                    setPhotoCard(preview)
                                                    setPhotoCaptionIndex(index)
                                                    go({currentTarget: {dataset: {goto: 'addModal_photo_modal'}}})
                                                }}
                                            />
                                        </Card>
                                    )
                                })
                            }
                        </CardScroll>
                        :
                            <Div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                                    <Icon56CameraOffOutline className='yellow-color' style={{margin: 'auto'}}/>
                                    <Caption style={{margin: 'auto'}}>Нет загруженных фото</Caption>
                            </Div>
                        }
                    </FormLayoutGroup>
                </FormLayout>

                <FormLayout>
                    <FormLayoutGroup bottom="Ваш отзыв будет обезличен и никто, кроме вас, не узнает об авторстве">
                        <Checkbox value={anonReview} onChange={() => setAnon(prev => !prev)}>
                            Оставить отзыв анонимно
                        </Checkbox>
                    </FormLayoutGroup>
                </FormLayout>

                <Button
                    size="xl"
                    stretched
                    className="yellow-gradient"
                    data-goto="addPanel_preview_review_panel"
                    onClick={go}
                >
                    Опубликовать
                </Button>
            </Div>

            {locationSnackbar}
        </Panel>
    )
}

export default TextPhotoPanel;