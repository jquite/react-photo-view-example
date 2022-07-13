import React, {useEffect, useState} from "react";
import {getCollectionEntries, singleCollection} from "../services/common";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import {
  LoadingOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  CustomerServiceFilled,
} from '@ant-design/icons';
import styles from './index.less';

const Example = () => {

  const id = 'OCD336000';
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(async () => {
    await singleCollection(id).then((response) => {
      if (response.hasOwnProperty('info')) {
        const { category, info, token, target } = response;

        setCategories(category);
        setActiveCategory(category[0]);
        getCategoryItems(id, 1);
      } else {
        const { code } = response;
        console.log('request error', code);
      }
    });
  }, []);

  // 获取分类资源详情
  const getCategoryItems = (cid, category) => {
    getCollectionEntries(id, category).then((response) => {
      let tempItems = [];
      if (response.length > 0) {
        response.forEach((item) => {
          const { photos } = item;
          if (photos && photos.length > 0) {
            photos.forEach((photo) => {
              const temp = { ...item };
              temp.photo = photo;
              tempItems.push(temp);
            });
          }
        });
      }
      setCurrentItems(tempItems);
    });
  };

  // 切换资源类型
  const onCategoryChange = (c, index) => {
    setActiveCategory(c);

    const i = (index + 1) % 2;
    getCategoryItems(id, i);
  };

  return (
    <div className={styles.box}>
      <div className={styles.menu}>
        {categories.map((c, index) => {
          return (
            <div
              key={index}
              className={[
                styles.menuItem,
                activeCategory === c ? styles.active : '',
              ].join(' ')}
              onClick={() => onCategoryChange(c, index)}
            >
              <span>{c}</span>
            </div>
          );
        })}
      </div>

      <div className={styles.container}>
        <div className={styles.entries}>
          <PhotoProvider
            maskClosable={false}
            toolbarRender={({ rotate, onRotate, onScale, scale, index }) => {
              return (
                <div className={styles.toolbar}>
                  <ZoomInOutlined onClick={() => onScale(scale + 1)} />
                  <ZoomOutOutlined onClick={() => onScale(scale - 1)} />
                  <RotateLeftOutlined onClick={() => onRotate(rotate - 90)} />
                  <RotateRightOutlined onClick={() => onRotate(rotate + 90)} />
                </div>
              );
            }}
            loadingElement={
              <LoadingOutlined style={{ color: '#FFF', fontSize: 24 }} />
            }
            overlayRender={({ images, rotate, onRotate, scale, index }) => {
              return (
                <div className={styles.overlayRender}>
                  <p>当前图片下标：{index}</p>
                  <p>图片集数量：{images.length}</p>
                </div>
              );
            }}
          >
            {currentItems.map((item, index) => (
              <div className={styles.item} key={index}>
                <PhotoView
                  src={`https://zhongguoyuyan.cn/svc/common/media/dialectCulture/W1920?id=${item._id}&serial=${item.photo.serial}`}
                  overlay={item}
                >
                  <img
                    src={`https://zhongguoyuyan.cn/svc/common/media/dialectCulture/small?id=${item._id}&serial=${item.photo.serial}`}
                    alt=""
                  />
                </PhotoView>
                <span style={{ fontSize: 18, fontWeight: 600 }}>
                  {item.entry}
                </span>
              </div>
            ))}
          </PhotoProvider>
        </div>
      </div>

    </div>
  )
}

export default Example;
