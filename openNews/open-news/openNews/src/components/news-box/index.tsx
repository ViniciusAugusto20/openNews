import React, { useEffect, useState } from 'react'
import { Box, Divider, Grid, Typography } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '../../store/ducks'
import { getNews } from '../../actions/main-actions'

import IUser from '../../models/user'
import INews from '../../models/news'

import './style.scss'

const NewsBox = () => {
  const dispatch = useDispatch()
  const news: INews[] = useSelector((state: RootState) => state?.main.news)
  const currentUser: IUser = useSelector(
    (state: RootState) => state?.main.currentUser
  )
  const exibirTodasNoticias = useSelector(
    (state: RootState) => state?.main.exibirTodasNoticias
  )
  const [newsToRender, setNewsToRender] = useState(news)
  const [currentTags, setCurrentTags] = useState<string[]>()

  const returnNewsByTag = value => {
    for (var i = 0; i < currentTags?.length; i++) {
      if (value.tag == currentTags[i]) return value
    }
  }
  useEffect(() => {
    dispatch(getNews())
  }, [])
  useEffect(() => {
    setNewsToRender(news?.filter(returnNewsByTag))
  }, [news, currentTags])
  useEffect(() => {
    if (exibirTodasNoticias == true) {
      setCurrentTags(['Tecnologia', 'Educação', 'Economia', 'Covid19', 'Mundo'])
    } else {
      setCurrentTags(currentUser.tags)
    }
  }, [news, exibirTodasNoticias])
  return (
    <>
      <Grid container spacing={0} justify="center" alignContent="center">
        {newsToRender?.map((currentNews: any, index: number) => (
          <Grid key={index} item xs className="NewsContainer">
            <Grid item xs>
              <Typography className="NewsTitle">
                {currentNews.titulo}
              </Typography>
              <Typography className="NewsPrimaryText">
                {currentNews.subtitulo}
              </Typography>
              <img className="ContainerImage" src={currentNews.image} />
              <Divider className="NewsDivider" />
              <Box style={{ textAlign: 'end' }}>
                <Typography className="NewsSecondaryText">
                  {' ' + currentNews.time + ' - '} Em
                  {' ' + currentNews.tag}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default NewsBox
