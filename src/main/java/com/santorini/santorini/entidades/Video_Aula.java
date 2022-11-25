package com.santorini.santorini.entidades;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

@Entity
@Table(name = "video_aula")
public class Video_Aula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_video_aula;
    private Long id_aula;
    @Lob
    private byte[] video;

    public Video_Aula() {
    }

    public Video_Aula(Long id_aula, byte[] video) {
        this.id_aula = id_aula;
        this.video = video;
    }

    public Long getId_video_aula() {
        return id_video_aula;
    }

    public void setId_video_aula(Long id_video_aula) {
        this.id_video_aula = id_video_aula;
    }

    public Long getId_aula() {
        return id_aula;
    }

    public void setId_aula(Long id_aula) {
        this.id_aula = id_aula;
    }

    public byte[] getVideo() {
        return video;
    }

    public void setVideo(byte[] video) {
        this.video = video;
    }

}
