import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Data {
  id: string;
  nome: string;
  imgperfil: string;
  imgPublicacao: string;
  likeada: boolean;
  likers: boolean;
  descricao: string;
}

const Lista = (data: Data) => {
  const [feedInfo, setFeedInfo] = useState(data);

  function mostraLikes(opt) {
    if (opt.likers <= 0) {
      return;
    }

    return (
      <Text style={styles.likes}>
        {opt.likers} {opt.likers > 1 ? "Curtidas" : "Curtida"}
      </Text>
    );
  }

  function Like(likeData) {
    if (likeData.likeada === true) {
      setFeedInfo({ ...likeData, likeada: false, likers: likeData.likers - 1 });
    } else {
      return setFeedInfo({
        ...likeData,
        likeada: true,
        likers: likeData.likers + 1,
      });
    }
  }

  function CarregaIcone(likeada: boolean) {
    return likeada ? require("../img/likeada.png") : require("../img/like.png");
  }

  return (
    <View style={styles.areaFeed}>
      <View style={styles.viewPerfil}>
        <Image source={{ uri: feedInfo.imgperfil }} style={styles.fotoPerfil} />
        <Text style={styles.nomeUsuario}>{feedInfo.nome}</Text>
      </View>
      <Image
        resizeMode="cover"
        style={styles.fotoPublicacao}
        source={{ uri: feedInfo.imgPublicacao }}
      />
      <View style={styles.areaBtn}>
        <TouchableOpacity onPress={() => Like(feedInfo)}>
          <Image
            source={CarregaIcone(feedInfo.likeada)}
            style={styles.iconeLike}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require("../img/send.png")} style={styles.iconeLike} />
        </TouchableOpacity>
      </View>

      {mostraLikes(feedInfo)}

      <View style={styles.viewRodape}>
        <Text style={styles.nomeRodape}>{data.nome}</Text>
        <Text style={styles.descRodape}>{data.descricao}</Text>
      </View>
    </View>
  );
};

export default Lista;

const styles = StyleSheet.create({
  areaFeed: {},
  fotoPerfil: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  nomeUsuario: {
    fontSize: 22,
    textAlign: "left",
    color: "#000",
  },
  viewPerfil: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    padding: 8,
    gap: 4,
  },
  fotoPublicacao: {
    flex: 1,
    height: 400,
    alignItems: "center",
  },
  areaBtn: {
    flexDirection: "row",
    padding: 5,
    gap: 4,
  },
  iconeLike: {
    width: 33,
    height: 33,
  },
  viewRodape: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  nomeRodape: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    paddingLeft: 5,
  },
  descRodape: {
    paddingLeft: 5,
    fontSize: 15,
    color: "#000",
  },
  likes: {
    fontWeight: "bold",
    marginLeft: 5,
  },
});
